import { Model } from 'mongoose';
type TCategory =
  | 'Writing'
  | 'Office Supplies'
  | 'Art Supplies'
  | 'Educational'
  | 'Technology';

export interface IProduct {
  name: string;
  brand: string;
  price: number;
  category: TCategory;
  description: string;
  quantity: number;
  inStock: boolean;
}

export interface ProductModel extends Model<IProduct> {
  isProductExists(id: string): Promise<IProduct | null>;
}
