const mongoose = require("mongoose");
const PostalCircle = require("../models/postalCircle");
const stampSchema = new mongoose.Schema({
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostalCircle",
  },
});

const Stamp = mongoose.model("Stamp", stampSchema);

module.exports = Stamp;
