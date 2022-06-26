import jwt from 'jsonwebtoken';
import {createHash} from 'crypto';
import {addUser, getUser} from './db.js';

const hash = pw => createHash('sha256').update(pw).digest('hex');

const users = [
  {id: 23, name: 'Kamilos'},
  {id: 12, name: 'Adamek'},
  {id: 2, name: 'Madziula'},
];

const refreshTokens = [];

const tok = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJLYW1pbG9zIiwiaWF0IjoxNjU2MTcxMzQ4fQ.lktrwoEmtfDu7mRtGeQ8xj10xdO9I5M2jcCQf2zS_mg";

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
    if (err) return res.sendStatus(403)
    req.user = data;    
    next();
  });
};

const registerHandler = conn => async (req, res) => {
  const {email, password} = req.body;
  const user = await getUser(conn, email);
  if (user) return res.sendStatus(409);
  if (!email || !password) return res.sendStatus(422);
  await addUser(conn, email, password);
  res.sendStatus(201);
};

const loginHandler = async (req, res) => {
  const user = users.find(u => u.name === req.body.name);
  const password = true;
  if (!user || !password) return res.sendStatus(401);
  const payload = user;
  const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '15m'});
  // const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
  // refreshTokens.push(refreshToken);
  res.json(token);
};

export {authMiddleware, hash, registerHandler, loginHandler};