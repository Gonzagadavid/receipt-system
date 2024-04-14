import { dbConnection } from "../../db";

export default class ProductModel {
  constructor() {
    this.db = dbConnection();
  }

  async createProduct(productData) {
    const query =
      "INSERT INTO products (name, category, state, price) VALUES(?,?,?,?);";
    const resp = this.db.execute(query, productData);
    if (!resp) throw new Error("An error occurred registering the product");
    return "Product created successfully";
  }

  async getProduct(productData) {
    const query =
      "SELECT * FROM products WHERE name=? AND category=? AND state=?;";
    return this.db.execute(query, productData);
  }
}
