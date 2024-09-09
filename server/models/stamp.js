const mongoose = require("mongoose");
const stampSchema = new mongoose.Schema({
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  img: String,
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
