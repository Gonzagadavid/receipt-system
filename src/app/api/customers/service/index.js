import { paginationResult } from "../../utils/paginationResult";
import CustomerModel from "../model";

export default class CustomerService {
  constructor() {
    this.model = new CustomerModel();
  }

  async createCustomer(customer) {
    const { name, taxpayerIdentification } = customer;
    const exists = await this.model.getCustomerByTaxpayer(
      taxpayerIdentification,
    );
    if (exists) return "Customer Already registered";
    return this.model.createCustomer([name, taxpayerIdentification]);
  }

  async getCustomerByTaxpayer(customer) {
    const { taxpayerIdentification } = customer;
    const exists = await this.model.getCustomerByTaxpayer(
      taxpayerIdentification,
    );
    if (exists) return "Customer Already registered";
    return null;
  }

  async listCustomers({ pageSize = "30", page = "1" }, name) {
    const skip = String(+pageSize * (+page - 1));
    const customersData = await this.model.getAllCustomers([pageSize, skip]);
    return paginationResult({ page, pageSize, ...customersData }, name);
  }

  async updateCustomer(customer, id) {
    const { name, taxpayerIdentification } = customer;

    return this.model.updateCustomer([name, taxpayerIdentification], id);
  }

  async deleteCustomer(id) {
    return this.model.deleteCustomer(id);
  }
}
