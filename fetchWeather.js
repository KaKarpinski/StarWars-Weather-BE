import fetch from 'node-fetch';

const fetchWeather = async conn => {
  // GLW localization
  const lat = 50.2947533;
  const long = 18.6711697;
  const key = '86b77586951ac0c6fe742ae091109fe2';
  const units = 'metric';
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=${units}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err)
  }
};

export default fetchWeather;
