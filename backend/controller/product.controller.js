import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

/* ======================================================
   ✅ Add Product with Cloudinary Upload (Timeout Fixed)
   ====================================================== */
export const addProduct = async (req, res) => {
  try {
    const { name, price, offerPrice, description, category, stock } = req.body;

    // ✅ Validation
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, Price, Category are required",
      });
    }

    // ✅ Check Images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product images are required",
      });
    }

    // ✅ Fix Description Format
    let descArray = [];
    if (description) {
      try {
        descArray = JSON.parse(description);
      } catch {
        descArray = [description];
      }
    }

    // ✅ Upload Images to Cloudinary (FAST + TIMEOUT FIX)
    const imageUploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "grocery-products",
        timeout: 60000,
      })
    );

    const uploadResults = await Promise.all(imageUploadPromises);

    const imageUrls = uploadResults.map((result) => result.secure_url);

    // ✅ Save Product
    const product = await Product.create({
      name,
      price: Number(price),
      offerPrice: offerPrice ? Number(offerPrice) : Number(price),
      category,
      description: descArray,
      stock: stock ? Number(stock) : 0,
      image: imageUrls,
      inStock: true,
    });

    return res.status(201).json({
      success: true,
      message: "✅ Product added successfully with Cloudinary image",
      product,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while adding product",
      error: error.message,
    });
  }
};

/* ======================================================
   ✅ Get All Products
   ====================================================== */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

/* ======================================================
   ✅ Get Product By ID
   ====================================================== */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await Product.findById(id);

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching product",
      error: error.message,
    });
  }
};

/* ======================================================
   ✅ Change Stock
   ====================================================== */
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "✅ Stock updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating stock",
      error: error.message,
    });
  }
};
