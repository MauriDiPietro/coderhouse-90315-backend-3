import { Router } from 'express';
import UserController from '../controllers/user.controllers.js';
import { passportCall } from "../passport/passportCall.js";
const controller = new UserController();

const router = Router();

router.post('/register', controller.register);

router.post('/login', controller.login);

router.get('/current', passportCall('current'), controller.profile);

export default router;