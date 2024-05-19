import { dbConnection } from "../../db";

export default class SalesModel {
  constructor() {
    this.db = dbConnection();
  }

  async registerSales(sale, products) {
    const conn = await this.db.getConnection();
    await conn.beginTransaction();
    try {
      const saleQuery =
        "INSERT INTO sales(seller, customer, total, rebate, created_at) VALUES(?,?,?,?,?);";
      const productQuery =
        "INSERT INTO products_sales (products_id, sales_id, current_price, quantity) VALUES?; ";
      const [{ insertId }] = await conn.execute(saleQuery, sale);
      if (!insertId) throw new Error("An error occurred registering the sale");
      const productValues = products.reduce(
        (values, product) => [
          ...values,
          [product.id, insertId, product.price, product.quantity],
        ],
        [],
      );
      const response = await conn.query(productQuery, [productValues]);
      if (!response) {
        throw new Error("An error occurred registering products in sale");
      }
      await conn.commit();
    } catch {
      await conn.rollback();
      await conn.release();
      throw err;
    }

    return "sale registered successfully";
  }

  async listSales({ customer, date_start, date_end }, pagination) {
    const params = [customer, date_start, date_end].filter((param) => param);
    const query = `
      SELECT s.id, s.created_at, u.name AS seller, s.total, s.rebate, c.name AS customer
      FROM
        sales AS s
        INNER JOIN users AS u ON s.seller = u.id
        INNER JOIN customers AS c ON c.id = s.customer
     ${customer || (date_start && date_end) ? " WHERE " : ""}
       ${customer ? "s.customer = ?" : ""}
       ${customer && date_start && date_end ? " AND " : ""}
       ${date_start && date_end ? "s.created_at >= ? AND s.created_at <= ?" : ""} LIMIT ? OFFSET ?;
      `;
    const totalQuery = `
    SELECT count(*) FROM sales 
   ${customer || (date_start && date_end) ? " WHERE " : ""}
     ${customer ? "customer = ?" : ""}
     ${customer && date_start && date_end ? " AND " : ""}
     ${date_start && date_end ? "created_at >= ? AND created_at <= ?" : ""};
    `;
    const [data] = await this.db.execute(query, [...params, ...pagination]);
    const [[{ total }]] = await this.db.execute(totalQuery, [...params]);
    return { data, total };
  }
}
