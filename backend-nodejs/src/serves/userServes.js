import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Image from "../models/image.js";
import {secretKey} from '../config/database.js';
import Gender from "../models/gender.js";

export default class UserServes {

  static async createDoc(data) {
      let name = 'male';
      if (data.genderId === 2) name = 'female';
      const genderId = await Gender.findOne({name: name});
      return new User({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            genderId: genderId._id,
            dateOfBirth: data.dateOfBirth,
            isAdmin: data?.isAdmin,
            eyeColor: data?.eyeColor,
            hairColor: data?.hairColor,
        });
  }
  static createToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    }
    return jwt.sign({ payload }, secretKey, { expiresIn: '24h' });
  }
  static async create(data) {
    try {
        data.password = await bcrypt.hash(data.password, 10)
        const doc = await UserServes.createDoc(data);
        const user = await doc.save()
        const token = UserServes.createToken(user);
        return { message: 'User created', user, token, error: null };
    } catch (e) {
      return { error: e.message };
    }
  }

  static async remove(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      return { message: 'User removed', user, error: null };
    } catch (e) {return { error: e.message }}
  }

  static async get(userId) {
    try {
      const user = await User.findById(userId);
      return { user, error: null};
    } catch (e) {return { error: e.message }}
  }
  static async getUsersWithPhotos() {
    try {
      const users = await User.find().populate('images').exec();
      return { users, error: null };
    } catch (e) {
      return { error: e.message };
    }
  }

  static async getAll() {
    try {
      const users = await User.find().populate('genderId');
      return { users };
    } catch (e) {return { error: e.message }}
  }

  static async update(userId, data) {
    try {
      const user = await User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true
      });
      return {message: 'User updated', user};
    } catch (e) {return { error: e.message }}
  }

  static async login(data) {
    try {
      const user = await User.findOne({email: data.email});
      if (!user) {
          return { error: 'User not found' };
      }
      const match = await bcrypt.compare(data.password, user.password);
      if (!match) {
          return { error: 'Invalid params' };
      }
      return { token: UserServes.createToken(user), error: null };
    } catch (e) {
      return { error: e.message };
    }
  }
}