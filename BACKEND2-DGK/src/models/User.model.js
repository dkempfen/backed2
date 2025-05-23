import mongoose from 'mongoose';

const schemaOptions = {
  timestamps: true,
};

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  },
  schemaOptions
);

export const UserModel = mongoose.model('User', userSchema);
