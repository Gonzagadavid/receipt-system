import { dbConnection } from "../../db";
import { paginationResult } from "../../utils/paginationResult";

export default class UserModel {
  constructor() {
    this.db = dbConnection();
  }

  async createUser(userData) {
    const query =
      "INSERT INTO users(name, email, password, role) VALUES(?,?,?,?);";
    const resp = await this.db.execute(query, userData);
    if (!resp) throw new Error("An error occurred registering the user");
    return "User created successfully";
  }

  async getUserByEmail(email) {
    const query = "SELECT email, password, role FROM users WHERE email=?";
    const [[resp]] = await this.db.execute(query, [email]);
    return resp;
  }

  async getAllUsers(pagination) {
    const query = "SELECT name, email, role FROM users LIMIT ? OFFSET ?;";
    const countQuery = "SELECT COUNT(*) as `total` from users;";
    const [data] = await this.db.execute(query, pagination);
    const [[{ total }]] = await this.db.execute(countQuery);

    return { data, total };
  }
}
