import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    details: String,
    cost: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    inventory: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    group: String,
    images: [String],
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model('Product', productSchema);
