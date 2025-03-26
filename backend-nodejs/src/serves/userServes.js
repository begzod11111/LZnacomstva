import bcrypt from 'bcrypt';
import {models} from "../config/database.js";
import goalmeeting from "../models/goalmeeting.js";

export default class UserServes {

    static async createDoc(data) {
        let name = 'male';
        if (data.genderId === 2) name = 'female';
        const gender = await models.Gender.findOne({name: name}).select('_id').exec();
        return new models.User({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            genderId: gender._id,
            dateOfBirth: data.dateOfBirth,
            isAdmin: data?.isAdmin,
            eyeColor: data?.eyeColor,
            hairColor: data?.hairColor,
        });

    }

    static async verify(data) {
        if (!data.email || !data.password || !data.firstName || !data.lastName || !data.dateOfBirth) {
            return {error: 'Not all fields are filled', verified: false};
        }
        const user = await models.User.findOne({email: data.email}).exec();
        if (user) {
            return {error: 'User with this email already exists', verified: false};
        }
        return {error: null, verified: true};
    }

    static async create(data) {
        try {
            data.password = await bcrypt.hash(data.password, 10)
            const doc = await UserServes.createDoc(data);
            console.log(doc)
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
        // Создаем объект для обновления
        const updateData = { ...data };

        // Параллельная обработка genderId и goalMeetingId
        await Promise.all([
            data.genderId &&
                models.Gender.findOne({ name: data.genderId })
                    .select('_id')
                    .lean()
                    .then(gender => {
                        if (!gender) throw new Error('Gender not found');
                        updateData.genderId = gender._id;
                    }),

            data.goalMeetingId &&
                models.GoalMeeting.findOne({ slug: data.goalMeetingId })
                    .select('_id')
                    .lean()
                    .then(goal => {
                        if (!goal) throw new Error('Goal meeting not found');
                        updateData.goalMeetingId = goal._id;
                    })
        ]);

        const user = await models.User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true,
                context: 'query' // Добавляет контекст для валидаторов
            }
        ).lean();

        if (!user) {
            throw new Error('User not found');
        }

        return { message: 'User updated', user };
    } catch (error) {
        // Более информативная обработка ошибок
        return {
            error: error.message,
            status: error.name === 'ValidationError' ? 400 : 500
        };
    }
}


}