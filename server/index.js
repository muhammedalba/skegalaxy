const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

// eslint-disable-next-line import/no-extraneous-dependencies
const rateLimit = require('express-rate-limit');
// eslint-disable-next-line import/no-extraneous-dependencies
const hpp = require('hpp'); 
const compression = require("compression");
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoSanitize = require('express-mongo-sanitize');

const ApiError = require("./utils/apiError");
const globalError = require("./middleWare/ErroeMidleWare");
const dbconnection = require("./db/database");

const { MountRoutes } = require("./routers/mountRoutes");
const { webhookCheckout } = require("./Controllers/order.Controler");

const app = express();
dotenv.config({ path: ".env" });

// enable other domains to access routes
app.use(cors());
app.options("*", cors());
// compression all responses
app.use(compression());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// webhook-checkout
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);
app.use(express.json({ limit: "25kb" }));
// app.use(express.json({
//   verify: (req, res, buf) => {
//     if (req.originalUrl.startsWith('/stripe/webhook')) {
//       req.rawBody = buf.toString();
//     }
//   },
//    }));
// To apply data sanitizotion:
app.use(mongoSanitize());
 // Limit each IP to 100 requests per `window` (here, per 15 minutes).
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100,
  message:"to mony accounts created from this IP  ,please tray agin after an hours"
})
app.use('/api/users/auth',limiter)

// middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp({whitelist: ['price','sold','quantity','ratingsQuantity','ratingsAverage']}));
 
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("mode:", process.env.NODE_ENV);
}

// connect with db

dbconnection();

//mount Routes
MountRoutes(app);
// Static file declaration
app.use(express.static(path.join(__dirname, '../client/dist')));
// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
// create error and send it to error handling middleware
app.use("*", (req, res, next) => {
  // const error=new Error(` can't find this route :${req.originalUrl} `)
  next(new ApiError(` can't find this route :${req.originalUrl} `, 400));
});
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`App is running port${PORT}`);
});

// Global error handling middleWare for express
app.use(globalError);

// handell ejection outside express
// تقوم بهندلة اي ايرور)(Rejection) قادم من خارج اكسبريس مثل ربط داتا بيس
process.on("unhandledRejection", (error) => {
  console.error(`unhandledRejection errors : ${error.name} ||  ${error.masge}`);
  server.close(() => {
    console.error(`shutting down ....`);
    process.exit(1);
  });
});
