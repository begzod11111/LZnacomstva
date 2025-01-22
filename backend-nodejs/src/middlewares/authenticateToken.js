import jwt from 'jsonwebtoken';
import { secretKey } from '../config/database.js';
import User from "../models/user.js";

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({message: 'Access denied. No token provided.'});
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.payload;
  } catch (ex) {
    res.status(400).json({message: 'Invalid token.'});
  }

  next()
};

export default authenticateToken;
