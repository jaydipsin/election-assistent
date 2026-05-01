const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require("path");
const compression = require('compression');
const hpp = require('hpp');
const { rateLimit } = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const frontendPath = path.join(__dirname, "dist", "election-assistent", "browser");

// Security & Efficiency Middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https:"],
      "script-src": ["'self'", "'unsafe-inline'"], // Needed for some Angular features if not using nonces
      "connect-src": ["'self'", "https://generativelanguage.googleapis.com"]
    },
  },
}));
app.use(compression()); // Efficiency: Compress responses
app.use(hpp()); // Security: Protect against HTTP Parameter Pollution
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200'
}));

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', globalLimiter);

app.use(express.json({ limit: '10kb' })); // Security: Limit body size
app.use(express.static(frontendPath));



// Routes
const electionRoutes = require('./routes/electionRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/election', electionRoutes);
app.use('/api/chat', chatRoutes);

// API 404 handler
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Catch-all route for frontend (must be last)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
