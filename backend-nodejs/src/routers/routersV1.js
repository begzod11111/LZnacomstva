import express from 'express';
import userRouter from './userRouter.js'
import genderRouter from './genderRouter.js'
import countryRouter from "./countryRouter.js";
import goalMeetingRouter from "./goalMeetingRouter.js";
import authRouter from "./jwtRouter.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import imageRouter from "./imageRouter.js";
import {models} from "../config/database.js";

const routerV1 = express.Router();

const test = (data) => {
    data.map(async (item) => {
        console.log(item);
    });
}


routerV1.route('/main')
    .get(async (req, res) => {
        try {
            const docs = await models.GoalMeeting.find().select(
                '-__v'
            ).populate({
                path: 'users',
                select: 'firstName age goalMeetingId genderId images',
                populate: [
                    {
                        path: 'images',
                        select: 'url userId',
                        match: {isMain: true},
                    },
                    {
                        path: 'countryId',
                        select: 'flag _id'
                    }
                ]
            }).exec() || null // Ожидаем выполнения запроса

            if (!docs) return {error: {message: 'Goal meeting not found'}}; // Если документ не найден, возвращаем ошибку
            if (docs.length === 0) return res.status(200).json({error: {message: 'Goal meeting not found'}}); // Если документ не найден, возвращаем ошибку
            docs.map(async (item) => {
                const users = item.users;
                users.map(async (user) => {
                    const image = user.images;
                    const flagPhoto = user.countryId;
                    delete user._doc.countryId;
                    return {...user._doc, photo: image[0].url, flag: flagPhoto};
                });
                console.log(item._doc, users);
                return {...item._doc, users};
            })
            // const result = await Promise.all(docs.map(async (item) => {
            //     const users = await Promise.all(item.users.map(async (user) => {
            //         const image = user.images;
            //         const flagPhoto = user.countryId.flag;
            //         delete user._doc.countryId;
            //         return {...user._doc, photo: image[0].url, flag: flagPhoto};
            //
            //     }));
            //     return {...item._doc, users};
            // }));
            return res.status(200).json({error: null, docs});
        } catch (e) {
            return res.status(400).json({error: e});
        }
    });

export default routerV1;