import express from 'express';
const router = express.Router();
import UserViews from "../views/UserViews.js";
import JwtServes from "../serves/jwtServes.js";

router.post('/sing-in', UserViews.login);
router.post('/sing-up', UserViews.create);
router.post('/verify', JwtServes.verify);


export default router;