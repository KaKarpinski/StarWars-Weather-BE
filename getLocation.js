import {Navigator} from 'node-navigator';
import fetch from 'node-fetch';

const navigator = new Navigator();

const failure = err => console.error(err);
const success = position => {
  const {latitude, longitude} = position;
  console.log(latitude)
  console.log(longitude)
  fetchWeather(latitude, longitude)
};

const fetchWeather = async (lat, long) => {
  // const lat = document.getElementById('latitude').value; 
  // const long = document.getElementById('longitude').value; 
  const key = '86b77586951ac0c6fe742ae091109fe2';
  const lang = 'en';
  const units = 'metric';
  // http://api.openweathermap.org/data/3.0/onecall?q=Berlin&APPID=86b77586951ac0c6fe742ae091109fe2
  const url = `http://api.openweathermap.org/data/3.0/onecall?lat=${lat.toFixed(2)}&lon=${long.toFixed(2)}&appid=${key}&units=${units}&lang=${lang}`;
  // fetch(url)
  //   .then(res => {
  //     if (!res.ok) throw new Error(res.statusText);
  //     return res.json(); 
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(err => console.log(err));
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err)
  }
};

const getLocation = () => {
  let opts = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 60 * 5,
  };
  navigator.geolocation.getCurrentPosition(success, failure, opts);
};

export default getLocation;
