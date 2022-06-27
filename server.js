import dotenv from 'dotenv';
import express from 'express';
import fetchWeather from './fetchWeather.js';
import {authMiddleware, loginHandler, registerHandler} from './auth.js';
import {getAllChars, getFiltered} from './swapi.js';
import {createPool, getLastWeather, updateWeather} from './db.js';

// use environment variables
dotenv.config();

const ONE_HOUR = 1000 * 60 * 60;

const PORT = 7232;
const app = express();

// create a pool
const dbPool = await createPool();
const conn = await dbPool.getConnection();

setInterval(async () => {
  const weather = await fetchWeather();
  updateWeather(conn, weather);
}, ONE_HOUR);

app.use(express.json());
app.use(express.static('public'))

app.get('/weather', authMiddleware, async (req, res) => {
  const lastWeather = await getLastWeather(conn);
  res.json(lastWeather[0]);
});

app.get('/starwars/getall', getAllChars);
app.get('/starwars/getfiltered', authMiddleware, getFiltered);

app.post('/register', registerHandler(conn));
app.post('/login', loginHandler(conn));

app.listen(PORT, () => console.log('Your app is running at port ' + PORT));
