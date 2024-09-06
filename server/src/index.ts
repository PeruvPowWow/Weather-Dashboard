import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3001;

const app = express();
const port = process.env.PORT || 3001;

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/weather/history', (req, res) => {
  // Read and send search history
  fs.readFile('searchHistory.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read search history' });
    }
    res.json(JSON.parse(data));
  });
});
