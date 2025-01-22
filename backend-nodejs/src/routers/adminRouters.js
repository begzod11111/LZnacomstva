import express from 'express';
import imageRouter from "./imageRouter.js";
import genderRouter from "./genderRouter.js";
import userRouter from "./userRouter.js";
import countryRouter from "./countryRouter.js";
import authRouter from "./jwtRouter.js";
import authenticateAdmin from "../middlewares/authenticateAdmin.js";

const router = express.Router()

router.use(authenticateAdmin)

router.use('/images', imageRouter);
router.use('/genders', genderRouter);
router.use('/users', userRouter);
router.use('/countries', countryRouter);


export default router
