import { Request, Response } from 'express';
import { Product } from '../models/product.model';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
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

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const products = await Product.find({
        $or: [
          { name: { $regex: searchTerm as string, $options: 'i' } },
          { category: { $regex: searchTerm as string, $options: 'i' } },
          { brand: { $regex: searchTerm as string, $options: 'i' } },
        ],
      });
      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: products,
      });
      return;
    }
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
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

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.updateOne({ _id: id }, req.body);
    if (!product) {
      throw new Error('Product not found');
    }
    const updatedProduct = await Product.findById(id);
    if (product.modifiedCount > 0 || product.matchedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Something went wrong',
      error,
      stack: (error as Error).stack,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.deleteOne({ _id: id });
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message || 'Something went wrong',
      error,
      stack: (error as Error).stack,
    });
  }
};
