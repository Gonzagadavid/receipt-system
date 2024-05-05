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

  async getAllProducts(pagination, name) {
    const query = `
    SELECT
    p.id as id,
    p.name as name,
    c.name as category,
    s.state as state,
    p.price as price
    FROM
        products as p
        INNER JOIN categories as c ON p.category = c.id
        INNER JOIN states as s ON p.state = s.id
    WHERE p.deleted_at IS NULL ${name ? "AND p.name LIKE ?" : ""}
    LIMIT ?
    OFFSET
    ?;`;
    const countQuery = `SELECT COUNT(*) as total from products  WHERE  deleted_at IS NULL ${name ? "AND name LIKE ?" : ""};`;
    const [data] = await this.db.execute(
      query,
      name ? [`%${name}%`, ...pagination] : pagination,
    );
    const [[{ total }]] = await this.db.execute(countQuery, [`%${name}%`]);

    return { data, total };
  }

  async updateProduct(productData, id) {
    const query =
      "UPDATE products set name=?,category=?,state=?,price=? WHERE id=?;";
    const resp = this.db.execute(query, [...productData, id]);
    if (!resp) throw new Error("An error occurred updating the product");
    return "Product updated successfully";
  }

  async getCategoryIdByName(category) {
    const query = "SELECT id FROM categories WHERE name=?";
    const [[{ id }]] = await this.db.execute(query, [category]);
    return id;
  }

  async getStateIdByName(state) {
    const query = "SELECT id FROM states WHERE state=?";
    const [[{ id }]] = await this.db.execute(query, [state]);
    return id;
  }

  async deleteProduct(id) {
    const query = `UPDATE products set deleted_at=? WHERE id = ?;`;
    const resp = await this.db.execute(query, [new Date(), id]);
    if (!resp) throw new Error("An error occurred removing the product");
    return "product removed successfully";
  }
}
