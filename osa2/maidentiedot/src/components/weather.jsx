import React, { useState, useEffect } from 'react';
import weatherService from '../services/services'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = () => {
      weatherService
        .getWeather(capital)
        .then(data => {
          setWeather(data);
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchWeather();
  }, [capital]);


  return (
    <div>
      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Description: {weather.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`Flag of ${name}`} style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
  )

}

export default Weather