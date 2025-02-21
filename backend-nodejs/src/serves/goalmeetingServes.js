import {models} from "../config/database.js";
import image from "../models/image.js";


export default  class goalMeetingServes {
    static async create(name) {
        const doc = new models.GoalMeeting({
            name: name
        });
        try {
            await doc.save();
            return {error: null, doc};
        } catch (e) {
            return {error: e};
        }
    }

    static async get(slug) {
        try {
            const doc = await models.GoalMeeting.findOne({slug}).populate('users').exec() || null; // Ожидаем выполнения запроса
            if (!doc) return {error: {message: 'Goal meeting not found'}}; // Если документ не найден, возвращаем ошибку
            return {error: null, doc};
        } catch (e) {
            return {error: e};
        }
    }

    static async getAll() {
        try {
            const docs = await models.GoalMeeting.find() || null;

            if (!docs) return {error: {message: 'Goal meeting not found'}}; // Если документ не найден, возвращаем ошибку

            return {error: null, goalMeetings: docs};
        } catch (e) {
            return {error: e};
        }
    }


    static async update(id, name) {
        try {
            const doc = await models.GoalMeeting.findByIdAndUpdate(id, {name: name}, {new: true});
            return {error: null, doc};
        } catch (e) {
            return {error: e};
        }
    }

    static async delete(req, res) {
        try {
            const doc = await models.GoalMeeting.findOneAndDelete({slug: req.params.slug});
            return {error: null, doc};
        } catch (e) {
            return {error: e};
        }
    }
}