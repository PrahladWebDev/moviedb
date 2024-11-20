import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

const router = express.Router();

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "movie-app/uploads", // Folder in Cloudinary
    allowed_formats: ["jpeg", "jpg", "png", "webp"], // Allowed image formats
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Unique ID for the image
  },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });

// Handle single image upload
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No image file provided" });
    }

    // Respond with the Cloudinary URL
    res.status(200).send({
      message: "Image uploaded successfully",
      image: req.file.path,
    });
  } catch (error) {
    res.status(500).send({ message: "Failed to upload image", error: error.message });
  }
});

export default router;
