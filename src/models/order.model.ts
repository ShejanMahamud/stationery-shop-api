import mongoose, { Schema } from 'mongoose';
import { IOrder } from '../types/order.types';

const orderSchema = new Schema<IOrder>(
  {
    email: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Order = mongoose.model('Order', orderSchema);
