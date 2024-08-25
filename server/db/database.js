const mongoose = require("mongoose");


const dbconnection = () => {
  // connect with db
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) =>
      console.log(`database is Connected ${conn.connection.host}`)
    )
    // .catch((error) => {
    //   console.log(`database is not connected`, error);
    //   process.exit(1);
    // });
};
module.exports = dbconnection;
