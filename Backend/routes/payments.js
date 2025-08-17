const express = require("express");
const router = express.Router();
const { createOrder, sendPaymentConfirmation } = require("../controllers/paymentController");
const { route } = require("./auth");

router.post("/create-order", createOrder);
router.post("/send-confirmation", sendPaymentConfirmation);

module.exports=router;
