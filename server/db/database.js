const mongoose = require("mongoose");


const dbconnection = () => {
  // connect with db
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) =>
      console.log(`database is Connected ${conn.connection.host}`)
    )
  
};
module.exports = dbconnection;
