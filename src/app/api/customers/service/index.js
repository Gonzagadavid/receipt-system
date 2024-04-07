import CustomerModel from "../model";

export default class CustomerService {
  constructor() {
    this.model = new CustomerModel();
  }

  async createCustomer(customer) {
    const { name, taxpayerIdentification } = customer;
    const exists = await this.model.getCustomerByTaxpayer(
      taxpayerIdentification
    );
    if (exists) return "Customer Already registered";
    return this.model.createCustomer([name, taxpayerIdentification]);
  }

  async getCustomerByTaxpayer(customer) {
    const { taxpayerIdentification } = customer;
    const exists = await this.model.getCustomerByTaxpayer(
      taxpayerIdentification
    );
    if (exists) return "Customer Already registered";
    return null;
  }
}
