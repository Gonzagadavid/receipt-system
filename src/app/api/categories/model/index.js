import { dbConnection } from "../../db";

export default class CategoryModel {
  constructor() {
    this.db = dbConnection();
  }

  async getCategories() {
    const query = "SELECT * from categories";
    const [categories] = await this.db.execute(query);
    return categories;
  }
}
