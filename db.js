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
  });
};

const createDB = async conn => await conn.query('CREATE TABLE users (email varchar(50) NOT NULL, password varchar(255) NOT NULL, token varchar(255), PRIMARY KEY (email))');

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
  await conn.query(`UPDATE users SET token = '${token}' WHERE email = '${email}'`)

export {addUser, addToken, createDB, createPool, getUser}