const router = require("express").Router();
const { verifyCircle } = require("../middlewares");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const {
  getAllStamps,
  createNewStamp,
  getStampById,
  updateStampById,
  deleteStampById,
} = require("../controllers/stamp");

router
  .route("/")
  .get(verifyCircle, getAllStamps)
  .post(verifyCircle, upload.array("img"), createNewStamp);

router
  .route("/:id")
  .get(verifyCircle, getStampById)
  .patch(verifyCircle, updateStampById)
  .delete(verifyCircle, deleteStampById);

module.exports = router;
