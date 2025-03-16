import {models} from "../config/database.js";

export default class GenderServes {

  static create = async (name) => {
    try {
      const valid = await models.Gender.findOne({ name });
      if (valid) {
        return { message: 'Экземпляр с таким именем уже сушествует' };
      }
      const gender = new models.Gender({ name });
      return await gender.save().then(
          (result) => {
            return result;
          }).catch(
          (err) => {
            console.error(err);
          });
    } catch (err) {
      console.error(err);
      throw new Error('Error creating gender');
    }
  }
  static get = async (slug) => {
    try {
      const gender = await models.Gender.findOne({slug})
      if (gender) {
        return gender
      } else {
        return {"message": "Экземпляр не найден"}
      }
    } catch (err) {
      console.error(err);
      return {"message": "ощибка"};
    }
  }

  static update = async (slug, name) => {
    try {
      const gender = await models.Gender.findOneAndUpdate({slug: slug}, {name: name}, {new: true});
      return {
        message: "Экземпляр успешно обновлен",
        gender: gender,
        error: null,
      }
    } catch (e) {
        console.error(e);
        return {message: 'Error updating', error: e};
    }

  }

  static delete = async (slug) => {
    try {
      const gender = await models.Gender.findOneAndDelete({slug: slug});
      return {
        message: "Экземпляр успешно удален",
        gender,
        error: null,
      }
    } catch (e) {
        console.error(e);
        return {message: 'Error deleting', error: e};
    }

  }

  static async getAll() {
     return models.Gender.find(undefined, undefined, undefined);
  }
}
