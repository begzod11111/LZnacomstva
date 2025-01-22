import { Sequelize, DataTypes } from 'sequelize';
import user from '../models/user.js';
import gender from "../models/gender.js";
import goalmeeting from "../models/goalmeeting.js";
import image from "../models/image.js";
import country from "../models/country.js";
import mongoose from "mongoose";

(async () => {
    await mongoose.connect('mongodb+srv://begzod:begzod0426@begzod.5alev.mongodb.net/?retryWrites=true&w=majority&appName=begzod',
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false
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

