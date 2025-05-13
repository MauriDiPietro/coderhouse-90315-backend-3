import { Router } from "express";
import CartController from '../controllers/cart.controllers.js';
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { passportCall } from "../passport/passportCall.js";
const controller = new CartController();

const router = Router();

router.get("/", [passportCall('current'), checkAdmin], controller.getAll);

router.get("/:id", [passportCall('current')], controller.getById);

router.post("/", [passportCall('current'), checkAdmin], controller.create);

router.put("/:id", [passportCall('current'), checkAdmin], controller.update);

router.delete("/:id", [passportCall('current'), checkAdmin], controller.delete);

router.post("/products/:idProd", [passportCall('current')], controller.addProdToCart);

router.delete("/:idCart/products/:idProd", [passportCall('current')], controller.removeProdToCart);

router.put("/:idCart/products/:idProd", [passportCall('current')], controller.updateProdQuantityToCart);

router.delete("/clear/:idCart", [passportCall('current')], controller.clearCart);

export default router;
