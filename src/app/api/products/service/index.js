import { paginationResult } from "../../utils/paginationResult";
import ProductModel from "../model";

export default class ProductService {
  constructor() {
    this.model = new ProductModel();
  }

  async createProduct(productData) {
    const { name, category, state, price } = productData;
    return this.model.createProduct([name, category, state, price]);
  }

  async existsProduct(productData) {
    const { name, category, state } = productData;
    const [[exists]] = await this.model.getProduct([name, category, state]);
    if (exists) return "Product Already registered";
    return null;
  }

  async listProducts({ pageSize = "30", page = "1" }, name) {
    const skip = String(+pageSize * (+page - 1));
    const productsData = await this.model.getAllProducts(
      [pageSize, skip],
      name
    );
    return paginationResult({ page, pageSize, ...productsData });
  }

  async updateProduct(productData, id) {
    const { name, category, state, price } = productData;
    let categoryId = category;
    if (/\D/.test(category)) {
      categoryId = await this.model.getCategoryIdByName(category);
    }
    let stateId = state;
    if (/\D/.test(category)) {
      stateId = await this.model.getCategoryIdByName(category);
    }

    return this.model.updateProduct([name, categoryId, stateId, price], id);
  }

  async deleteProduct(id) {
    return this.model.deleteProduct(id);
  }
}
