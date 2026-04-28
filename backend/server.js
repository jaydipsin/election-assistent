const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get, update } = require('firebase/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200'
}));
app.use(express.json());

// Firebase Client SDK Setup
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

// Attach Database to req for use in controllers if needed (optional)
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
const electionRoutes = require('./routes/electionRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/election', electionRoutes);
app.use('/api/chat', chatRoutes);

// Progress Endpoints (Kept in server.js for simplicity or can be moved to a controller)
app.get('/api/progress/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  console.log(`[Database] Fetching progress for session: ${sessionId}`);
  
  try {
    const progressRef = ref(db, `sessions/${sessionId}/progress`);
    
    // Add a timeout promise to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Firebase timeout')), 5000)
    );

    const snapshot = await Promise.race([get(progressRef), timeoutPromise]);
    
    console.log(`[Database] Successfully retrieved data for ${sessionId}`);
    res.json(snapshot.val() || {});
  } catch (error) {
    console.error(`[Database Error] Session ${sessionId}:`, error.message);
    res.status(500).json({ error: 'Database connection failed or timed out' });
  }
});

app.post('/api/progress/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { stepId, status } = req.body;
    const progressRef = ref(db, `sessions/${sessionId}/progress`);
    await update(progressRef, { [stepId]: status, lastUpdated: new Date().toISOString() });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
