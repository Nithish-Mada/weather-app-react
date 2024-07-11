import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY; // Ensure your API key is correctly set in your environment variables

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

  getHistoricalWeather: async (lat, lon, timestamp) => {
    try {
      // The timestamp should be in UNIX format
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching historical weather:', error);
      throw error;
    }
  },
};

export default WeatherService;
