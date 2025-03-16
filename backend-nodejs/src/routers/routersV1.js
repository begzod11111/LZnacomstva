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
                select: 'firstName lastName age goalMeetingId genderId images countryId',
                populate: [
                    {
                        path: 'images',
                        select: 'url userId',
                        match: {isMain: true},
                    },
                    {
                        path: 'gender',
                        select: '_id name',
                    },
                    {
                        path: 'country',
                        select: '_id name',
                        populate: {
                            path: "image",
                            select: 'url',
                        }
                    }
                ]
            }).exec() || null // Ожидаем выполнения запроса

            if (!docs) return {error: {message: 'Goal meeting not found'}}; // Если документ не найден, возвращаем ошибку
            if (docs.length === 0) return res.status(200).json({error: {message: 'Goal meeting not found'}}); // Если документ не найден, возвращаем ошибку
            const result = await Promise.all(docs.map(async (item) => {
                const users = await Promise.all(item.users.map(async (user) => {
                    return {
                        ...user._doc,
                        photo: user.get_avatar(),
                        country: {...user.country._doc, flagUrl: user.country.image.url || null},
                        gender: user.gender.name
                    };
                }));
                return {...item._doc, users};
            }));
            return res.status(200).json({error: null, result});
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: `Error: ${e.message} routesV1.js`});
        }
    })
routerV1.route('/users/:id')
    .get(async (req, res) => {
        const user = await models.User.findById(req.params.id).select(
            'firstName age goalMeetingId createdAt eyeColor hairColor height weight aboutMe'
        ).populate({
            path: 'images',
            select: 'url userId isMain',
        }).populate({
            path: "goalMeeting",
            select: 'name slug',
        })
        if (!user) return res.status(404).json({error: 'User not found'});
        return res.status(200).json({error: null, user: {
            ...user._doc,
                images: user.getImages(),
                goalMeeting: user.goalMeeting,
            }});
    });
routerV1.route('/profile/:id')
    .get(authenticateUser, async (req, res) => {
        const user = await models.User.findById(req.params.id).select(
            '-__v -password'
        ).populate({
            path: 'images',
            select: 'url userId isMain',
        }).populate('goalMeeting').populate({
            path: 'gender',
            select: 'name',
        }).populate('gender').exec();
        if (!user) return res.status(404).json({error: 'User not found'});
        return res.status(200).json({error: null, user: {
                ...user._doc,
                images: user.getImages(),
                goalMeeting: user.goalMeeting,
                gender: user.gender
        }});
    })


export default routerV1;