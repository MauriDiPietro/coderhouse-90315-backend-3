import FSDao from "./fs.dao.js";
const path = "./users.json";

export default class UserDaoFS extends FSDao {
  constructor() {
    super(path)
  }
}
