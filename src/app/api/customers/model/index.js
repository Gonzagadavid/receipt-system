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
    const customer = await this.db.execute(query, [taxpayerIdentification]);
    return customer;
  }
}
