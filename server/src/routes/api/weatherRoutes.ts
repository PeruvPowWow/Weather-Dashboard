import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    console.error('City name is missing from the request');
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    console.log(`Fetching weather data for city: ${cityName}`);
    
    // GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    
    // Log the retrieved weather data
    console.log('Weather data retrieved:', weatherData);

    // Save city to search history
    await HistoryService.addCity(cityName);
    console.log(`Added ${cityName} to search history`);

    return res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// GET search history
router.get('/history', async (_req, res) => {
  try {
    console.log('Fetching search history');
    const searchHistory = await HistoryService.getCities();
    return res.json(searchHistory);
  } catch (error) {
    console.error('Error fetching search history:', error);
    return res.json({ error: 'Failed to fetch search history' });
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Deleting city with id: ${id}`);
    const deletedCity = await HistoryService.removeCity(id);
    res.status(200).json({ deletedCity });
  } catch (error) {
    console.error('Error deleting city from search history:', error);
    res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});

export default router;
