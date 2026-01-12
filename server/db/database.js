const mongoose = require("mongoose");


const dbconnection = () => {
  // connect with db
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = dbconnection;

