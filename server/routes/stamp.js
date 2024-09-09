const router = require("express").Router();
const { verifyCircle } = require("../middlewares");

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
  .post(verifyCircle, createNewStamp);

router
  .route("/:id")
  .get(verifyCircle, getStampById)
  .patch(verifyCircle, updateStampById)
  .delete(verifyCircle, deleteStampById);

module.exports = router;
