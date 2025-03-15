import bcrypt from 'bcrypt';
import {models} from "../config/database.js";

export default class UserServes {

    static async createDoc(data) {
        let name = 'male';
        if (data.genderId === 2) name = 'female';
        const genderId = await models.Gender.findOne({name: name});
        return new models.User({
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
                filter.genderId = (await models.Gender.findOne({name: query.gender}).select('_id').exec())._id;
            }
            if (query.country){
                filter.countryId = (await models.Country.findOne({name: query.country}).select('_id').exec())._id;
            }
            const users = await models.User.find(filter).populate({
              path: 'images',
                select: 'url _id',
              match: { isMain: true }// Фильтрация изображений, чтобы выбрать только те, у которых isMain: true
            }).exec();
            return {users: users.map(e => {
                const i = e.get_avatar();
                return {...e._doc, ava: i};
            }), error: null};

        } catch (e) {
            return {error: e.message};
        }
    }

  static async remove(userId) {
    try {
      const user = await models.User.findByIdAndDelete(userId);
      return { message: 'User removed', user, error: null };
    } catch (e) {return { error: e.message }}
  }

  static async get(userId) {
    try {
      const user = await models.User.findById(userId).populate('images').exec();
      const images = user.images;
      return { user: {...user._doc, images}, error: null};
    } catch (e) {return { error: e.message }}
  }
  static async getUsersWithPhotos() {
    try {
      const users = await models.User.find().select(
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
      const user = await models.User.findByIdAndUpdate(userId, data, {
        new: true,
        runValidators: true
      });
      return {message: 'User updated', user};
    } catch (e) {return { error: e.message }}
  }


}