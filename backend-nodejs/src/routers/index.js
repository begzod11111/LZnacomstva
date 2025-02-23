// routes/index.js
import express from 'express';
import userRouter from './userRouter.js'
import genderRouter from './genderRouter.js'
import countryRouter from "./countryRouter.js";
import goalMeetingRouter from "./goalMeetingRouter.js";
import authRouter from "./jwtRouter.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import imageRouter from "./imageRouter.js";
import imageMiddleware from "../middlewares/imageMiddlewares.js";
import routerV1 from "./routersV1.js";

const router = express.Router();


router.use('/users/:id', authenticateUser);
router.use('/images/:id', imageMiddleware);
router.use('/images', imageRouter);
router.use('/genders', genderRouter);
router.use('/users', userRouter);
router.use('/countries', countryRouter);
router.use('/goal-meetings', goalMeetingRouter);
router.use('/v1', routerV1);

export default router;