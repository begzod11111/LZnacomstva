import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {secretKey} from "../config/database.js";


export default class JwtServes {
  static async create(data) {
    try {
      const user = await User.findOne({email: data.email});
      if (!user) {
          return { error: 'User not found' };
      }
      const match = await bcrypt.compare(data.password, user.password);
      if (!match) {
          return { error: 'Invalid params' };
      }
      return { token: JwtServes.getToken(user), error: null };
    } catch (e) {
      return { error: e.message };
    }
  }

  static async verify(req, res) {
    const token = req.body.token;
    try {
      const decoded = jwt.verify(token, secretKey);
      return res.status(200).json({ invalidToken: false, message: 'Token is valid.' });
    } catch (e) {
      return res.status(400).json({ invalidToken: true, message: 'Token is invalid.' });
    }
  }

  static getToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    }
    return jwt.sign({payload}, secretKey, {expiresIn: '24h'});
  }
}