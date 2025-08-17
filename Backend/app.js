const express = require('express');
const app = express();

const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const database = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}));

cloudinaryConnect();
database.connect();

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/doctor', require('./routes/Doctor'));
app.use('/api/v1/patient', require('./routes/Patient'));
app.use('/api/v1/test', require('./routes/Test'));
app.use('/api/v1/bill', require('./routes/Bill'));
app.use('/api/v1/xray', require('./routes/xray'));
app.use('/api/v1/payment', require('./routes/payments'));
app.use('/api/v1/appointment',require('./routes/Appointment'));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Your server is up and running....',
  });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




module.exports = app;


