const Stamp = require("../models/stamp");
const errorResponse = require("../utils/error");

const getAllStamps = async (req, res) => {
  try {
    const allStamps = await Stamp.find({}).populate("author");
    res.status(200).json(allStamps);
  } catch (e) {
    errorResponse(res, e);
  }
};

const createNewStamp = async (req, res) => {
  try {
    const { title, price } = req.body;
    const newStamp = await Stamp.create({ title, price });
    newStamp.images = req.files.map((img) => {
      return {
        url: img.path,
        filename: img.filename,
      };
    });
    newStamp.author = req.user.id;
    newStamp.save();
    res.status(200).json(newStamp);
  } catch (e) {
    errorResponse(res, e);
  }
};

const getStampById = async (req, res) => {
  try {
    const { id } = req.params;
    const requestedStamp = await Stamp.findById(id).populate("author");
    res.status(200).json(requestedStamp);
  } catch (e) {
    errorResponse(res, e);
  }
};

const updateStampById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStamp = await Stamp.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedStamp);
  } catch (e) {
    errorResponse(res, e);
  }
};

const deleteStampById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStamp = await Stamp.findByIdAndDelete(id, { new: true });
    res.status(200).json(deletedStamp);
  } catch (e) {
    errorResponse(res, e);
  }
};

module.exports = {
  getAllStamps,
  createNewStamp,
  getStampById,
  updateStampById,
  deleteStampById,
};
