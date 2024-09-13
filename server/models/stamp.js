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

stampSchema.set("toObject", { virtuals: true });
stampSchema.set("toJSON", { virtuals: true });

stampSchema.virtual("crop").get(function () {
  return this.images.map((image) => {
    const newImageUrl = image.url?.replace(
      "/upload",
      "/upload/c_fill,h_500,w_500"
    );
    image.url = newImageUrl;
    return image;
  });
});

const Stamp = mongoose.model("Stamp", stampSchema);

module.exports = Stamp;
