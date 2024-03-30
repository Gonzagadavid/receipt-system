import { dbConnection } from "../../db";

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
}
