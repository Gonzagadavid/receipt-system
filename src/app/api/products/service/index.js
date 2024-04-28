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
  async listProducts({ "page-size": pageSize, page }) {
    const skip = String(+pageSize * (+page - 1));
    const productsData = await this.model.getAllProducts([pageSize, skip]);
    return paginationResult({ page, pageSize, ...productsData });
  }
}
