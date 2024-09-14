import { useState } from 'react';
import { fetchCurrentWeather, fetchWeatherForecast } from './api/weatherAPI'; // Importing API calls
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission for weather search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error before new search

    try {
      const weatherData = await fetchCurrentWeather(city);
      setCurrentWeather(weatherData);

      const forecastData = await fetchWeatherForecast(city);
      setForecast(forecastData);
    } catch (err) {
      setError('Error fetching weather data');
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city" 
          required 
        />
        <button type="submit">Search</button>
      </form>

      {/* Display error message */}
      {error && <p>{error}</p>}

      {/* Display current weather */}
      {currentWeather && (
        <div>
          <h2>Current Weather in {currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
          <p>Weather: {currentWeather.weather[0].description}</p>
        </div>
      )}

      {/* Display 5-day weather forecast */}
      {forecast && (
        <div>
          <h2>5-Day Forecast</h2>
          {forecast.list.slice(0, 5).map((day: any, index: number) => (
            <div key={index}>
              <p>Date: {new Date(day.dt_txt).toLocaleDateString()}</p>
              <p>Temperature: {day.main.temp}°C</p>
              <p>Humidity: {day.main.humidity}%</p>
              <p>Wind Speed: {day.wind.speed} m/s</p>
              <p>Weather: {day.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
