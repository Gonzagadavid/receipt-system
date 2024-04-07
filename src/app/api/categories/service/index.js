import CategoryModel from "../model";

export default class CategoryService {
  constructor() {
    this.model = new CategoryModel();
  }

  async getCategories() {
    return this.model.getCategories();
  }
}
