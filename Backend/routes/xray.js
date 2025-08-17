const express = require("express");
const router = express.Router();
const multer = require("multer");
const { analyzeXray } = require("../controllers/xrayController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/analyze", upload.single("xrayImage"), analyzeXray);

module.exports = router;


