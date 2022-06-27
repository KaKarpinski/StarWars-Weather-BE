import jwt from 'jsonwebtoken';
import {createHash} from 'crypto';
import {addUser, addToken, getUser} from './db.js';

const hash = pw => createHash('sha256').update(pw).digest('hex');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
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

const loginHandler = conn => async (req, res) => {
  const {email, password} = req.body;
  const user = await getUser(conn, email);
  const userPW = user.password;
  const hashedPW = hash(password);

  if (!user || (hashedPW !== userPW)) return res.sendStatus(401);
  const payload = {email: email};
  const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '15m'});
  await addToken(conn, email, token);
  res.json(token);
};

export {authMiddleware, hash, registerHandler, loginHandler};