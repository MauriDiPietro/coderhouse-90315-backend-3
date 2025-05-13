import { Router } from 'express';
import ProductController from '../controllers/product.controllers.js';
import { checkAdmin } from '../middlewares/checkAdmin.js';
import { passportCall } from '../passport/passportCall.js';
const controller = new ProductController();

const router = Router();

router.get('/', [passportCall('current')], controller.getAll);

router.get('/:id', [passportCall('current')], controller.getById);

router.post('/', [passportCall('current'), checkAdmin], controller.create);

router.put('/:id', [passportCall('current'), checkAdmin], controller.update);

router.delete('/:id', [passportCall('current'), checkAdmin], controller.delete);

export default router;

