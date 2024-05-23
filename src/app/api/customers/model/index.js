import { dbConnection } from "../../db";

export default class CustomerModel {
  constructor() {
    this.db = dbConnection();
  }

  async createCustomer(userData) {
    const query =
      "INSERT INTO customers(name, taxpayer_identification) VALUES(?,?);";
    const resp = await this.db.execute(query, userData);
    if (!resp) throw new Error("An error occurred registering the customer");
    return "Customer created successfully";
  }

  async getCustomerByTaxpayer(taxpayerIdentification) {
    const query = "SELECT * from customers WHERE taxpayer_identification=?";
    const [[customer]] = await this.db.execute(query, [taxpayerIdentification]);
    return customer;
  }

  async getAllCustomers(pagination, name) {
    const query = `SELECT id, name, taxpayer_identification FROM customers WHERE deleted_at IS NULL  ${name ? "AND name LIKE ?" : ""} LIMIT ? OFFSET ?;`;
    const countQuery = `SELECT COUNT(*) as total from customers  WHERE deleted_at IS NULL ${name ? "AND name LIKE ?" : ""};`;
    const [data] = await this.db.execute(
      query,
      name ? [`%${name}%`, ...pagination] : pagination,
    );
    const [[{ total }]] = await this.db.execute(countQuery, [`%${name}%`]);

    return { data, total };
  }

  async updateCustomer(customerData, id) {
    const query = `UPDATE customers set name=?, taxpayer_identification=? WHERE id = ?;`;
    const resp = await this.db.execute(query, [...customerData, id]);
    if (!resp) throw new Error("An error occurred updating the customer");
    return "Customer updated successfully";
  }

  async deleteCustomer(id) {
    const query = `UPDATE customers set deleted_at=? WHERE id = ?;`;
    const resp = await this.db.execute(query, [new Date(), id]);
    if (!resp) throw new Error("An error occurred removing the customer");
    return "Customer removed successfully";
  }
}
