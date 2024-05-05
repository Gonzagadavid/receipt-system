import { hashValue } from "../../utils/hash";
import { paginationResult } from "../../utils/paginationResult";

import UserModel from "../model";

export default class UserService {
  constructor() {
    this.model = new UserModel();
  }

  async createUser(user) {
    const { name, email, password, role } = user;
    const passwordHashed = await hashValue(password, +process.env.SALT_HAS);
    return this.model.createUser([name, email, passwordHashed, role]);
  }

  async getUserByEmail(email) {
    return this.model.getUserByEmail(email);
  }

  async listUsers({ "page-size": pageSize, page }) {
    const skip = String(+pageSize * (+page - 1));
    const usersData = await this.model.getAllUsers([pageSize, skip]);
    return paginationResult({ page, pageSize, ...usersData });
  }

  async updateUser(user, id) {
    const { name, email, password, role } = user;
    if (password) {
      const passwordHashed = await hashValue(password, +process.env.SALT_HAS);
      return this.model.updateUser(
        [name, email, passwordHashed, role, id],
        true,
      );
    }
    return this.model.updateUser([name, email, role, id]);
  }

  async deleteUser(id) {
    return this.model.deleteUser(id);
  }
}
