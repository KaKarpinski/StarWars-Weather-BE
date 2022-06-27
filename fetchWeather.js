import fetch from 'node-fetch';
import dotenv from 'dotenv';
import {updateWeather} from './db.js';

dotenv.config();

// GLW localization
const LAT = 50.2947533;
const LONG = 18.6711697;

const fetchWeather = async () => {
  const units = 'metric';
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LONG}&appid=${process.env.API_KEY}&units=${units}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err)
  }
};

const periodicallyCheckWeather = async (conn, period) => {
  setInterval(async () => {
    const weather = await fetchWeather();
    updateWeather(conn, weather);
  }, period);
};

export default periodicallyCheckWeather;
