// App.js
import React from 'react';
import WeatherDisplay from './WeatherDisplay';

const App = () => {
  return (
    <div className="App">
      <h1>Weather App</h1>
      <WeatherDisplay city="Hyderabad" /> {/* Replace with your desired city */}
    </div>
  );
};

export default App;
