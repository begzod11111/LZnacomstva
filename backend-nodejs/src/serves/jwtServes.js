import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {secretKey} from "../config/database.js";
import {models} from "../config/database.js";


export default class JwtServes {
  static async create(data) {
    try {
      const user = await models.User.findOne({email: data.email}).select(
        'password firstName email lastName isAdmin _id'
      ).populate({
        path: 'images',
        select: 'url userId',
      })
      if (!user) {
          return { error: 'User not found' };
      }
      const match = await bcrypt.compare(data.password, user.password);
      if (!match) {
          return { error: 'Invalid params' };
      }
      const token = JwtServes.getToken(user);
      const decoded = jwt.verify(token, secretKey);
      delete user._doc.password;
      return { token, payload: {...decoded.payload, ava: user.get_avatar(),fullName: user.getFullName()}, error: null, };
    } catch (e) {
      return { error: e.message };
    }
  }

  static async verify(req, res) {
    const token = req.body.token;
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log(decoded)
      return res.status(200).json({
        tokenValid: true,
        message: 'Token is valid.',
        payload: decoded.payload
      });
    } catch (e) {
      return res.status(400).json({ tokenValid: false, message: 'Token is invalid.' });
    }
  }

  static getToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    }
    return jwt.sign({payload}, secretKey, {expiresIn: '99h'});
  }
}