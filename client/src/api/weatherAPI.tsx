import axios from 'axios';

// Function to fetch current weather data by city name
export const fetchCurrentWeather = async (city: string) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: process.env.VITE_WEATHER_API_KEY, // API key from .env
        units: 'metric' // You can change this to 'imperial' if you prefer Fahrenheit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    throw error;
  }
};

// Function to fetch 5-day weather forecast by city name
export const fetchWeatherForecast = async (city: string) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        q: city,
        appid: process.env.VITE_WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};
