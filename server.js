import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import getLocation from './getLocation.js';
import {authMiddleware, loginHandler, registerHandler} from './auth.js';
import {getAllChars, getFiltered} from './swapi.js';
import {createPool} from './db.js';

const PORT = 7232;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// create a pool
const dbPool = await createPool();
const conn = await dbPool.getConnection();

app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/location', (req, res) => {
  getLocation()
  res.send('ok')
});

app.get('/starwars/getall', getAllChars);
app.get('/starwars/getfiltered', authMiddleware, getFiltered);

app.post('/register', registerHandler(conn));
app.post('/login', loginHandler);

app.listen(PORT, () => console.log('Your app is running at port ' + PORT));
