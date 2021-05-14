import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [temperature, setTemperature] = useState(null);

  function celsius(event) {
    event.preventDefault();
    let newTemperature = ((temperature - 32) * 5) / 9;
    setTemperature(newTemperature);
  }

  function fahrenheit(event) {
    event.preventDefault();
    setTemperature(weather.temperature);
  }

  function getCityWeather(response) {
    setLoaded(true);
    setTemperature(response.data.main.temp);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "f9ed2779c7a88244e3c6c97a1ad830b5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(getCityWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Type a city"
          autoComplete="off"
          autoFocus
          onChange={updateCity}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <p className="city">Currently in {city}:</p>
        <div className="row align-items-center">
          <div className="col float-left">
            <img src={weather.icon} alt={weather.description} />
          </div>
          <div className="col float-left">
            <ul>
              <li>
                Temperature: {Math.round(temperature)}{" "}
                <a href="/" onClick={fahrenheit}>
                  °F
                </a>{" "}
                |{" "}
                <a href="/" onClick={celsius}>
                  °C
                </a>
              </li>
              <li className="capitalize">Description: {weather.description}</li>
              <li>Humidity: {weather.humidity}%</li>
              <li>Wind: {Math.round(weather.wind)} mph</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
