// App.js
import React from 'react';
import WeatherDisplay from './WeatherDisplay';
//require('dotenv').config() // Uncomment this line if running outside of Create React App environment
const city=process.env.REACT_APP_CITY
const App = () => {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherDisplay city={city} /> {/* Corrected to use environment variable */}
    </div>
  );
};

export default App;
