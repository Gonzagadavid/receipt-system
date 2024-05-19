import { paginationResult } from "../../utils/paginationResult";
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

  async listSales({
    customer,
    date_start,
    date_end,
    page_size: pageSize = "30",
    page = "1",
  }) {
    const skip = String(+pageSize * (+page - 1));
    const salesData = await this.model.listSales(
      { customer, date_start, date_end },
      [pageSize, skip],
    );

    return paginationResult({ page, pageSize, ...salesData });
  }
}
