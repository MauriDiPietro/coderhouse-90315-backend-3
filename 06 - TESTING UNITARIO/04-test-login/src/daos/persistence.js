import ProductDaoFS from "./filesystem/product.dao.js";
import ProductDaoMongo from "./mongodb/product.dao.js";
import UserDaoFS from "./filesystem/user.dao.js";
import UserDaoMongo from "./mongodb/user.dao.js";
import CartDaoMongo from "./mongodb/cart.dao.js";
import { initMongoDB } from "../db/connection.js";

let userDao = null;
let prodDao = null;
let cartDao = null;
let persistence = process.argv[2];

switch (persistence) {
  case "FILE":
    prodDao = new ProductDaoFS("./src/daos/filesystem/products.json");
    userDao = new UserDaoFS("./src/daos/filesystem/users.json");
    console.log(persistence);
    break;
  case "MONGO":
    initMongoDB()
      .then(() => console.log("base de datos conectada"))
      .catch((error) => console.log(error));
    prodDao = new ProductDaoMongo();
    userDao = new UserDaoMongo();
    cartDao = new CartDaoMongo();
    console.log(persistence);
    break;
  default:
    prodDao = new ProductDaoFS("./src/daos/filesystem/products.json");
    userDao = new UserDaoFS("./src/daos/filesystem/users.json");
    console.log(persistence);
    break;
}

export default { userDao, prodDao, cartDao };
