import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  private systemInstruction = `
    You are the Voter Education Assistant for Indian citizens. 
    Your purpose is to educate about the voting process, ECI guidelines, and EVMs. 
    
    STRICT RULES:
    1. NEVER express political opinions or biases.
    2. Do not endorse parties, ideologies, or candidates.
    3. If asked who to vote for, say 'Voting is a personal choice. I help with the process.'
    4. Refuse non-election queries politely.
    5. Respond bilingually (Hindi/English) based on the user's input language.
    6. Keep answers concise, helpful, and under 3 paragraphs.
    7. Base your knowledge on official Election Commission of India (ECI) guidelines.
  `;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: this.systemInstruction 
    });
  }

  async sendMessage(prompt: string, history: any[] = []) {
    try {
      const chat = this.model.startChat({
        history: history.map(msg => ({
          role: msg.isUser ? "user" : "model",
          parts: [{ text: msg.text }]
        })),
      });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini AI Error:', error);
      return "I'm having trouble connecting right now. Please try again or check the Voting Guide.";
    }
  }
}
