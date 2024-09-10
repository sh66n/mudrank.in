const mongoose = require("mongoose");
const postalCircleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    enum: [
      "AP",
      "AS",
      "BR",
      "CG",
      "DL",
      "GJ",
      "HR",
      "HP",
      "JK",
      "JH",
      "KA",
      "KL",
      "MP",
      "MH",
      "NE",
      "OR",
      "PB",
      "RJ",
      "TN",
      "TG",
      "UP",
      "UK",
      "WB",
    ],
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

const PostalCircle = mongoose.model("PostalCircle", postalCircleSchema);
module.exports = PostalCircle;
