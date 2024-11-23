import { Request, Response } from 'express';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { product, quantity } = req.body;

    if (!product || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product or quantity',
      });
    }

    const productDetails = await Product.findById(product);
    if (!productDetails) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (productDetails.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    const updatedQuantity = productDetails.quantity - quantity;
    const inStock = updatedQuantity > 0;

    await Product.updateOne(
      { _id: product },
      { $set: { quantity: updatedQuantity, inStock } },
    );

    const order = await Order.create({
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Something went wrong',
      error,
      stack: (error as Error).stack,
    });
  }
};

export const totalRevenue = async (req: Request, res: Response) => {
  try {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ]);
    const totalRevenue = orders[0] || { totalRevenue: 0 };
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Something went wrong',
      error,
      stack: (error as Error).stack,
    });
  }
};
