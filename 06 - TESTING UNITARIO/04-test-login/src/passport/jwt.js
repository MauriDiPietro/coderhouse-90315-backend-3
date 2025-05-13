import passport from "passport";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import UserService from "../services/user.services.js";
const userService = new UserService();

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = async (jwt_payload, done) => {
  if (!jwt_payload) return done(null, false, { messages: "User not found" });
  return done(null, jwt_payload);
};

const cookieExtractor = (req) => {
  const token = req.cookies.token;
  console.log("cookie--->", token);
  return token;
};

const strategyConfigCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: SECRET_KEY,
};

passport.use("current", new jwtStrategy(strategyConfigCookies, verifyToken));

passport.serializeUser((user, done) => {
  try {
    // console.log(user)
    done(null, user.userId);
  } catch (error) {
    return done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
