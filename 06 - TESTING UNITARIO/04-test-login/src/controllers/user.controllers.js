import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { createResponse } from "../utils.js";

const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const data = await this.service.register(req.body);
      !data
        ? createResponse(req, res, 404, data)
        : createResponse(req, res, 200, data);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      res.cookie("token", token, { httpOnly: true });
      !token
        ? createResponse(req, res, 404, null, token)
        : createResponse(req, res, 200, token);
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      if (req.user) {
        const user = await this.service.getUserById(req.user.userId);
        return createResponse(req, res, 200, user);
      }
      createResponse(req, res, 401, null, { msg: "Unhautorized" });
    } catch (error) {
      next(error);
    }
  };
}
