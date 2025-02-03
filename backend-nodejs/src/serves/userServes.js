import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {secretKey} from '../config/database.js';
import Gender from "../models/gender.js";
import Country from "../models/country.js";

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


    static async create(data) {
        try {
            data.password = await bcrypt.hash(data.password, 10)
            const doc = await UserServes.createDoc(data);
            const user = await doc.save()
            return {message: 'User created', user, error: null};
        } catch (e) {
            return {error: e.message};
        }
    }

    static async getUsersWithQuery(query) {
        try {
            const filter = {};
            if (query.gender) {
                filter.genderId = (await Gender.findOne({name: query.gender}).select('_id').exec())._id;
            }
            if (query.country){
                filter.countryId = (await Country.findOne({name: query.country}).select('_id').exec())._id;
            }

            const users = await User.find(filter).populate('images').exec();
            return {users: users.map(e => {
                const images = e.images;
                return {...e._doc, images};
            }), error: null};

        } catch (e) {
            return {error: e.message};
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
      const user = await User.findById(userId).populate('images').exec();
      const images = user.images;
      return { user: {...user._doc, images}, error: null};
    } catch (e) {return { error: e.message }}
  }
  static async getUsersWithPhotos() {
    try {
      const users = await User.find().select(
          'email firstName lastName dateOfBirth genderId isAdmin eyeColor hairColor'
      ).populate('images').exec();

      return { users: users.map(e => {
            const images = e.images;
            return {...e._doc, images};
          }), error: null };
    } catch (e) {
      return { error: e.message };
    }
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


}