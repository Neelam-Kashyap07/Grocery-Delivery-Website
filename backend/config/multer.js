import multer from "multer";
import path from "path";
import fs from "fs";

/* ======================================================
   ✅ Multer Configuration (Fixed + Stable)
   ====================================================== */

// ✅ Ensure uploads folder exists
const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Storage setup (temporary local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ Save files inside uploads folder
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "");
    cb(null, uniqueName);
  },
});

// ✅ File Filter (Only Images Allowed)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = allowedTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error("❌ Only image files are allowed (jpg, jpeg, png, webp)"));
  }
};

// ✅ Multer Upload Middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // ✅ Max 2MB per image
  },
});
