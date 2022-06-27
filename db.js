import dotenv from 'dotenv';
import mysql from 'promise-mysql';
import {hash} from './auth.js';

dotenv.config();

const createPool = async () => {
  console.log('creating a db pool');
  return mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWD,
    database: process.env.DB_NAME,
    connectionLimit: 20,
    multipleStatements: true,
  });
};

const createDB = async conn => await conn.query('CREATE TABLE users (email varchar(50) NOT NULL, password varchar(255) NOT NULL, token varchar(255), PRIMARY KEY (email)); CREATE TABLE weather (id INT NOT NULL AUTO_INCREMENT, current_weather JSON NOT NULL, PRIMARY KEY (id));');

/***
 * returns user or undefined if not found
 */
const getUser = async (conn, email) => {
  const result = await conn.query(`SELECT * FROM users WHERE email = '${email}'`);
  return result[0];
};

const addUser = async (conn, email, pw) =>
  await conn.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hash(pw)}')`);

const addToken = async (conn, email, token) =>
  await conn.query(`UPDATE users SET token = '${token}' WHERE email = '${email}'`);

const updateWeather = async (conn, weather) =>
  await conn.query(`INSERT INTO weather (current_weather) VALUES ('${JSON.stringify(weather)}')`);

const getLastWeather = async conn =>
 await conn.query('SELECT * FROM weather ORDER BY id DESC limit 1;');

export {addUser, addToken, createDB, createPool, getLastWeather, getUser, updateWeather};