const mongoose = require("mongoose");
async function connectDb(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("database connected");
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = connectDb;
