const ApiError = require("../utils/apiError");

const sendErrorForDevMode = (err, res) => res.status(err.statusCode).json({
    status: err.status,
    error: err,
    messagr: err.message,
    stack: err.stack,
  });
const sendErrorForProMode = (error, res) => res.status(error.statusCode).json({
    status: error.status,

    messagr: error.message,
  });
const handelJwtInvalidToken = () => new ApiError(" invalid token ,please login again... ", 401);
const handelJwtExpired = () => new ApiError("Expired token ,please login again... ", 401);
const globalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDevMode(error, res);
  } else {
    if (error.name === "JsonWebTokenError") error = handelJwtInvalidToken();
    if (error.name === "TokenExpiredError") error = handelJwtExpired();
    sendErrorForProMode(error, res);
  }
};

module.exports = globalError;
// http://localhost:4000/uploads/users/users-1741879649878-c76bb777-b5fc-4262-a5f1-7f7f7a6fd291.WebP
