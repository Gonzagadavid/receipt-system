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

  async getAllUsers(pagination) {
    const query =
      "SELECT id, name, email, role FROM users WHERE deleted_at IS NULL LIMIT ? OFFSET ?;";
    const countQuery = "SELECT COUNT(*) as `total` from users;";
    const [data] = await this.db.execute(query, pagination);
    const [[{ total }]] = await this.db.execute(countQuery);

    return { data, total };
  }

  async updateUser(userData, hasPassword = false) {
    const query = `UPDATE users set name=?, email=?,${hasPassword ? "password=?, " : ""} role=? WHERE id = ?;`;
    const resp = await this.db.execute(query, userData);
    if (!resp) throw new Error("An error occurred updating the user");
    return "User updated successfully";
  }

  async deleteUser(id) {
    const query = `UPDATE users set deleted_at=? WHERE id = ?;`;
    const resp = await this.db.execute(query, [new Date(), id]);
    if (!resp) throw new Error("An error occurred removing the user");
    return "User removed successfully";
  }
}
