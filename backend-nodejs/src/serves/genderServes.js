import Gender from "../models/gender.js";

export default class GenderServes {
  constructor(req) {
    this.req = req;
  }
  create = async () => {
    try {
      const valid = await Gender.findOne({ name: this.req.body.name });
      if (valid) {
        return { message: 'Экземпляр с таким именем уже сушествует' };
      }
      const gender = new Gender({ name: this.req.body.name });
      const result = await gender.save().then(
          (result) => {
            return result;
          }).catch(
            (err) => {
              console.error(err);

            });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('Error creating gender');
    }
  }
  get = async () => {
    try {
      const gender = await Gender.findOne({name: this.req.params.slug})
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

  delete = async () => {
    const gender = await this.get()
    return gender.deleteOne();
  }

  static async getAll() {
     return Gender.find(undefined, undefined, undefined);
  }
}
