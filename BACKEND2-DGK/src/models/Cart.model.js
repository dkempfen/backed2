import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        count: Number,
      },
    ],
    ownerEmail: String,
  },
  { timestamps: true }
);

export const CartModel = mongoose.model('Cart', cartSchema);
