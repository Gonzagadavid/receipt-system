import SalesModel from "../model";

export default class SalesService {
  constructor() {
    this.model = new SalesModel();
  }

  async registerSale(seller, saleData) {
    const { products, customer, total, rebate } = saleData;
    return this.model.registerSales(
      [seller, customer, total, rebate, new Date()],
      products,
    );
  }
}
