import express from 'express';
import path from 'path';
import fs from 'fs';

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

app.post('/api/weather', express.json(), (req, res) => {
    // Handle saving a new city and fetching weather data
    const city = req.body.city;
    if (!city) {
      return res.status(400).json({ error: 'City is required' });
    }
  
    // Save city and respond with weather data
    fs.readFile('searchHistory.json', 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read search history' });
      }
  
      const history = JSON.parse(data);
      history.push({ id: new Date().toISOString(), city });
      fs.writeFile('searchHistory.json', JSON.stringify(history), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to save search history' });
        }
        // Fetch weather data (example URL, replace with actual implementation)
        // const weatherData = fetchWeatherData(city);
        res.json({ message: `Weather data for ${city}` });
      });
    });
  });
  
  app.get('*', (req, res) => {
    // Serve the React app
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });