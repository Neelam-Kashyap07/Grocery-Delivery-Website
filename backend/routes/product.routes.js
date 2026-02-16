import express from "express";

import {
  addProduct,
  getProductById,
  getProducts,
} from "../controller/product.controller.js";

import { upload } from "../config/multer.js";

const router = express.Router();

/* ======================================================
   ✅ Product Routes (Fixed)
   ====================================================== */

// ✅ Add Product (Image Upload)
router.post("/add-product", upload.array("image", 4), addProduct);

// ✅ Get All Products
router.get("/list", getProducts);

// ✅ Get Product By ID
router.get("/id", getProductById);

export default router;
