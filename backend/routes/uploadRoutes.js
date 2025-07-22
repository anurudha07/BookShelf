import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Tell multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "product_images",           // optional: stores all uploads in this folder
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) =>
      `img_${Date.now()}`,               // you control the filename here
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  // Cloudinary puts the final URL on req.file.path
  res.send(req.file.path);
});

export default router;
