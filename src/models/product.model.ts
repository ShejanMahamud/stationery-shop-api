import mongoose, { Schema } from 'mongoose';
import { IProduct, ProductModel } from '../types/product.types';

const productSchema = new Schema<IProduct, ProductModel>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false },
);

productSchema.statics.isProductExists = async function (id) {
  const isProductExists = await Product.findById(id);
  return isProductExists;
};

export const Product = mongoose.model<IProduct, ProductModel>(
  'Product',
  productSchema,
);
