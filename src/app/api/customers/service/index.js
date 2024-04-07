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
    if (exists) return "Customer Already registred";
    return this.model.createCustomer([name, taxpayerIdentification]);
  }
}
