// WeatherService.js
import axios from 'axios';

const API_KEY = 'Your_api_key'; // Replace with your API key

const WeatherService = {
  getCurrentWeather: async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  },

  getHistoricalWeather: async (city, startDate, endDate) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${city.lat}&lon=${city.lon}&dt=${endDate}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching historical weather:', error);
      throw error;
    }
  },
};

export default WeatherService;