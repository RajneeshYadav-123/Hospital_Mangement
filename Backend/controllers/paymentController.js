const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { paymentEmailTemplate } = require("../mail/templates/paymentemail");

exports.createOrder = async (req, res) => {
  try {
    const { amount, patientName } = req.body;

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Order creation failed" });
  }
};


exports.sendPaymentConfirmation = async (req, res) => {
  try {
    const { payment_id, patientEmail, patientName, amount } = req.body;

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Hospital Admin" <${process.env.EMAIL_USER}>`,
      to: patientEmail,
      subject: "Payment Confirmation - Hospital Bill",
      html: paymentEmailTemplate(patientName, amount, payment_id),
    };

    
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Payment confirmation email sent",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};
