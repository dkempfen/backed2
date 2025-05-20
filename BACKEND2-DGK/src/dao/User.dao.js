import { UserModel } from '../models/User.model.js';

export class UserRepository {
  async findById(userId) {
    return await UserModel.findById(userId);
  }

  async findByEmail(userEmail) {
    return await UserModel.findOne({ email: userEmail });
  }

  async add(userData) {
    return await UserModel.create(userData);
  }

  async findAll() {
    return await UserModel.find({});
  }
}
