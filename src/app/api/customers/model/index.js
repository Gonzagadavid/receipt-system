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

  async getAllCustomers(pagination) {
    const query =
      "SELECT id, name, taxpayer_identification FROM customers LIMIT ? OFFSET ?;";
    const countQuery = "SELECT COUNT(*) as `total` from customers;";
    const [data] = await this.db.execute(query, pagination);
    const [[{ total }]] = await this.db.execute(countQuery);

    return { data, total };
  }

  async updateCustomer(customerData, id) {
    console.log(customerData, id);
    const query = `UPDATE customers set name=?, taxpayer_identification=? WHERE id = ?;`;
    const resp = await this.db.execute(query, [...customerData, id]);
    if (!resp) throw new Error("An error occurred updating the customer");
    return "Customer updated successfully";
  }
}
