const { GoogleGenerativeAI } = require('@google/generative-ai');
const electionData = require('../config/electionData');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chat = async (req, res) => {
  try {
    const { message, history, electionType } = req.body;
    
    // Dynamically build system instructions based on selected election type
    let dynamicInstructions = `You are the official Voter Education AI for Indian citizens. Your role is strictly educational.`;
    
    if (electionType && electionData[electionType]) {
      const data = electionData[electionType];
      dynamicInstructions += `\n\nCONTEXT for the current user's journey: ${data.context}\nRULES: ${data.rules.join(' ')}\nSTEPS: ${data.steps.map(s => s.title).join(' -> ')}`;
    }

    dynamicInstructions += `\n\nSTRICT RULES: 
    1. ONLY respond to queries regarding Indian elections, voting processes, or voter education.
    2. If a message is unrelated to elections (e.g., "how are you", "who won the cricket match", or random numbers/characters), politely refuse by saying you can only assist with election-related information.
    3. If the input is ambiguous or too short (like just a single number "1"), ask the user to clarify their specific question about the voting process.
    4. NEVER express political opinions or biases. 
    5. RESPOND ONLY in the language the user starts with (Hindi or English). 
    6. DO NOT provide both languages in the same response.
    7. Keep formatting clean and concise. Avoid walls of text.
    8. If asked 'who should I vote for?', explain the importance of personal research and the secret ballot. 
    9. Provide factual info based on the provided context if available.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: dynamicInstructions
    });

    // Filter history to ensure it starts with 'user'
    const formattedHistory = (history || [])
      .map(msg => ({
        role: msg.isUser ? "user" : "model",
        parts: [{ text: msg.text }]
      }))
      .filter((msg, index, self) => {
        const firstUserIndex = self.findIndex(m => m.role === 'user');
        if (index < firstUserIndex) return false;
        if (index === self.length - 1 && msg.role === 'user' && msg.parts[0].text === message) return false;
        return true;
      });

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    res.json({ text: response.text() });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ text: "The assistant is busy. Please try again later." });
  }
};
