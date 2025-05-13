import Services from "./class.services.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { createHash, isValidPassword } from "../utils.js";
import UserDTO from "../dto/user.dto.js";
import persistence from "../daos/persistence.js";
const { userDao, cartDao } = persistence;

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = "5m") {
    const payload = {
      userId: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: time });
  }

  register = async (user) => {
    try {
      const { email, password } = user;
      const existUser = await this.dao.getByEmail(email);

      if (!existUser) {
        const cartUser = await cartDao.createCart();
        const newUser = await this.dao.create({
          ...user,
          password: createHash(password),
          cart: cartUser._id,
        });
        return newUser;
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (user) => {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if (userExist && passValid) return this.generateToken(userExist);
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (id) => {
    try {
      const user = await this.dao.getUserById(id);
      return new UserDTO(user);
    } catch (error) {
      throw new Error(error);
    }
  };
}
