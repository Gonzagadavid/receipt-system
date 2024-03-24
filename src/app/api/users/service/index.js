import { hashValue } from "../../utils/hash";

const { default: UserModel } = require("../model");

export default class UserService {
  constructor() {
    this.model = new UserModel();
  }

  async createUser(user) {
    const { name, email, password, role } = user;
    const passwordHashed = await hashValue(password, +process.env.SALT_HAS);
    return this.model.createUser([name, email, passwordHashed, role]);
  }
}
