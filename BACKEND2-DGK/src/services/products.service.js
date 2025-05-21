import { ProductModel } from '../models/Product.model.js';

export class ProductService {
  async findAll() {
    return await ProductModel.find();
  }

  async findById(id) {
    return await ProductModel.findById(id);
  }

  async addProduct(productInfo) {
    return await ProductModel.create(productInfo);
  }

  async modify(id, updates) {
    return await ProductModel.findByIdAndUpdate(id, updates, { new: true });
  }

  async remove(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

