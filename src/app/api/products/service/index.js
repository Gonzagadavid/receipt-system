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
}
