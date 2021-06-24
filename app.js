const express = require("express");
// const http = require("http");
const https = require("https");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
// const compression = require("compression");

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");

// app
const app = express();

// db
mongoose
  .connect(process.env.MONGODB_ATLAS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

// for pinging server
app.get("/", (req, res) => {
  res.send("easymart.online server is up and listening!");
});

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
// app.use(compression());

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

// const httpPort = process.env.HTTP_PORT || 7000;
const httpsPort = process.env.HTTPS_PORT || 8000;

var options = {
  key: fs.readFileSync("./ssl_certificate/key.pem"),
  cert: fs.readFileSync("./ssl_certificate/cert.pem"),
};

// http.createServer(app).listen(httpPort, () => {
//   console.log(`Server is running on port ${httpPort}`);
// });

https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Server is running on port ${httpsPort}`);
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
