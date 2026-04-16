const mongoose = require("mongoose");

const dbconnection = async () => {
  // طباعة للتشخيص
  console.log(process.env.DB_URL);
  console.log("MongoDB...");

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log('MongoDB error', err.message);
    console.error(err);
    process.exit(1);
  }
};
module.exports = dbconnection;
