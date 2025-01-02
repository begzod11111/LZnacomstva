// routes/index.js
import express from 'express';
import userRouter from './userRouter.js'
import genderRouter from './genderRouter.js'
import countryRouter from "./countryRouter.js";
const router = express.Router();


router.use('/genders', genderRouter);
router.use('/users', userRouter);
router.use('/countries', countryRouter);

export default router;