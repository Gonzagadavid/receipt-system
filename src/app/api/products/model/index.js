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

  async getAllProducts(pagination) {
    const query = `
    SELECT
    p.name as name,
    c.name as category,
    s.state as state,
    p.price as price
    FROM
        products as p
        INNER JOIN categories as c ON p.category = c.id
        INNER JOIN states as s ON p.state = s.id
    LIMIT ?
    OFFSET
    ?;`;
    const countQuery = "SELECT COUNT(*) as `total` from products;";
    const [data] = await this.db.execute(query, pagination);
    const [[{ total }]] = await this.db.execute(countQuery);

    return { data, total };
  }
}
