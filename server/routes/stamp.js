const router = require("express").Router();
const { verifyToken } = require("../middlewares");
const Stamp = require("../models/stamp");

const errorResponse = (res, e) => {
  return res.status(500).json({
    error: e,
    message: "Internal Server error",
  });
};

router
  .route("/")
  .get(verifyToken, async (req, res) => {
    try {
      const allStamps = await Stamp.find({});
      res.status(200).json(allStamps);
    } catch (e) {
      errorResponse(res, e);
    }
  })
  .post(verifyToken, async (req, res) => {
    try {
      const { title, price } = req.body;
      const newStamp = await Stamp.create({ title, price });
      res.status(200).json(newStamp);
    } catch (e) {
      errorResponse(res, e);
    }
  });

router
  .route("/:id")
  .get(verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const requestedStamp = await Stamp.findById(id);
      res.status(200).json(requestedStamp);
    } catch (e) {
      errorResponse(res, e);
    }
  })
  .patch(verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const updatedStamp = await Stamp.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedStamp);
    } catch (e) {
      errorResponse(res, e);
    }
  })
  .delete(verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const deletedStamp = await Stamp.findByIdAndDelete(id, { new: true });
      res.status(200).json(deletedStamp);
    } catch (e) {
      errorResponse(res, e);
    }
  });

module.exports = router;
