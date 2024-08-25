const jwt = require("jsonwebtoken");

exports.createToken = (payload) =>
    jwt.sign(
      { userId: payload._id, role: payload.role, email: payload.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );
  