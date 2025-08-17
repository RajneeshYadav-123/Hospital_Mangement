const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

exports.analyzeXray = async (req, res) => {
  try {
    const file = req.file;
    const form = new FormData();
    form.append("file", fs.createReadStream(file.path));

    const response = await axios.post("http://localhost:5001/predict", form, {
      headers: form.getHeaders(),
    });

    return res.status(200).json({
      success: true,
      message: "Prediction completed",
      predictions: response.data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "AI prediction failed" });
  }
};
