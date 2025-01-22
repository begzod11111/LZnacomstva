// routes/index.js
import express from 'express';
import userRouter from './userRouter.js'
import genderRouter from './genderRouter.js'
import countryRouter from "./countryRouter.js";
import authRouter from "./jwtRouter.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import authenticateUser from "../middlewares/authenticateUser.js";
import imageRouter from "./imageRouter.js";
import authenticateImage from "../middlewares/authenticateImage.js";
const router = express.Router();




router.use('/users/:id', authenticateUser);
router.use('/images/:id', authenticateImage);


router.use('/images', imageRouter);
router.use('/genders', genderRouter);
router.use('/users', userRouter);
router.use('/countries', countryRouter);



export default router;
