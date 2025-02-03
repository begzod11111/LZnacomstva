import {models} from "../config/database.js";

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

    static async get(id) {
        try {
            const doc = await models.GoalMeeting.findById(id);
            return {error: null, doc};
        } catch (e) {
            return {error: e};
        }
    }

    static async getAll() {
        try {
            const doc = await models.GoalMeeting.find().populate('users');
            const result = doc.map(item => {
                const users = item.users;
                return {users, ...item._doc};
            })
            return {error: null, result};
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
        res.send('deleteGoalMeeting');
    }
}