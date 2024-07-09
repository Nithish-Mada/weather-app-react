// WeatherDisplay.js
import React, { useState, useEffect } from 'react';
import WeatherService from './WeatherService';
import Chart from 'chart.js/auto';

const WeatherDisplay = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [historicalWeather, setHistoricalWeather] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current weather
        const currentData = await WeatherService.getCurrentWeather(city);
        setCurrentWeather(currentData);

        // Fetch historical weather (last 7 days)
        const today = Math.floor(Date.now() / 1000);
        const historicalData = await WeatherService.getHistoricalWeather(
          city,
          today - 86400, // yesterday
          today
        );
        setHistoricalWeather(historicalData.hourly.slice(0, 24)); // Limit to 24 hours
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]);

  useEffect(() => {
    // Update historical chart when data changes
    if (historicalWeather.length > 0) {
      const ctx = document.getElementById('weatherChart').getContext('2d');
      const labels = historicalWeather.map((hour) =>
        new Date(hour.dt * 1000).toLocaleTimeString('en-US', {
          hour: 'numeric',
          hour12: true,
        })
      );
      const temperatures = historicalWeather.map((hour) => hour.temp);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatures,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });
    }
  }, [historicalWeather]);

  return (
    <div>
      <h2>Current Weather</h2>
      {currentWeather && (
        <div>
          <p>Temperature: {currentWeather.main.temp} °C</p>
          <p>Description: {currentWeather.weather[0].description}</p>
        </div>
      )}

      <h2>Historical Weather for {city}</h2> {/* Displaying city name */}
      <canvas id="weatherChart" width="400" height="200"></canvas>
    </div>
  );
};

export default WeatherDisplay;
