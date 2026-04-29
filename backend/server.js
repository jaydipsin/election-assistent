const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const frontendPath = path.join(__dirname, "dist", "election-assistent", "browser");

// Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200'
}));
app.use(express.json());
app.use(express.static(frontendPath));



// Routes
const electionRoutes = require('./routes/electionRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/election', electionRoutes);
app.use('/api/chat', chatRoutes);

// Catch-all route for frontend (must be last)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
