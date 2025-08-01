import React, { useState } from 'react';
import './App.css';
import { motion } from 'framer-motion';

const API_KEY = "fc49cd819cf1c84bcd258f3bdbdc2fd5"; // I have fetched this ApI from openweatherapp

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      alert("Error fetching weather");
    }
  };

  const getWeatherByLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        if (data.cod === 200) {
          setWeather(data);
          setCity('');
        } else {
          alert("Location weather not found");
        }
      } catch (error) {
        alert("Error fetching location weather");
      }
    });
  };

  return (
    <div className="app">
      <h1>Weather App 🌤️</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      <div style={{ marginTop: '10px' }}>
        <button onClick={getWeatherByLocation}>📍 My Location Weather</button>
      </div>

      {weather && (
        <motion.div
          className="weather-box"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </motion.div>
      )}

    
      <footer>
        <span>
        © 2025 Weather App | Made by Aman with collabration with IBM ❤️ using React & Framer Motion
         </span>
      </footer>
    </div>
  );
}

export default App;
