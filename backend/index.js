import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/connectDB.js";
import { connectCloudinary } from "./config/cloudinary.js";

// Routes
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

// ✅ Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env properly
dotenv.config({ path: path.join(__dirname, ".env") });

// ✅ Debug checks (Safe)
console.log("✅ Loaded MONGO_URI:", process.env.MONGO_URI);
console.log("✅ Cloudinary Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("✅ Cloudinary API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("✅ Cloudinary API SECRET:", process.env.CLOUDINARY_API_SECRET);


// ✅ App Init
const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ✅ Static Upload Folder (for local testing)
app.use("/images", express.static(path.join(__dirname, "uploads")));

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend is Working Fine!");
});

// ✅ API Routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// ✅ Start Server
const startServer = async () => {
  try {
    // Connect Database
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");

    // Connect Cloudinary
    await connectCloudinary();
    console.log("✅ Cloudinary Connected Successfully");

    // Start Express Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server Start Error:", error.message);
  }
};

startServer();
