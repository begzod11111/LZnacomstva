import { Sequelize, DataTypes } from 'sequelize';
import user from '../models/user.js';
import gender from "../models/gender.js";
import goalmeeting from "../models/goalmeeting.js";
import image from "../models/image.js";
import country from "../models/country.js";
import mongoose from "mongoose";

(async () => {
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
      ssl: false // true для облачных баз данных
    }).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error(err);
    });
})();

export const secretKey = 'begzod0426'
export const models = {
    user,
    gender,
    goalmeeting,
    image,
    country,
};

