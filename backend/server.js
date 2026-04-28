const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200'
}));
app.use(express.json());

// Rate Limiting for Chat API
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

// Firebase Admin Setup
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  });
} catch (error) {
  console.error('Firebase Admin Init Error:', error.message);
}

const db = admin.database();

// Gemini AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    You are the official Voter Education AI for Indian citizens. Your role is strictly educational. 
    RULES: 
    1. You MUST NOT answer political questions or show bias toward any party/leader. 
    2. If asked 'who should I vote for?', explain the importance of personal research and the secret ballot. 
    3. Provide factual info on EVMs, VVPATs, and ECI guidelines. 
    4. Support Hindi and English. 
    5. Refuse non-election queries.
    6. Keep responses under 3 paragraphs.
  `
});

// --- API ENDPOINTS ---

// Get User Progress
app.get('/api/progress/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const snapshot = await db.ref(`sessions/${sessionId}/progress`).once('value');
    res.json(snapshot.val() || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Update User Progress
app.post('/api/progress/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { stepId, status } = req.body;
    
    await db.ref(`sessions/${sessionId}/progress`).update({
      [stepId]: status,
      lastUpdated: new Date().toISOString()
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Secure Chat Proxy
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;
    
    const chat = model.startChat({
      history: (history || []).map(msg => ({
        role: msg.isUser ? "user" : "model",
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ 
      text: "The assistant is currently busy, please try again later or check our static Voting Guide." 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
