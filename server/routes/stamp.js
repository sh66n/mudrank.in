const router = require("express").Router();
const { verifyToken } = require("../middlewares");

const {
  getAllStamps,
  createNewStamp,
  getStampById,
  updateStampById,
  deleteStampById,
} = require("../controllers/stamp");

router
  .route("/")
  .get(verifyToken, getAllStamps)
  .post(verifyToken, createNewStamp);

router
  .route("/:id")
  .get(verifyToken, getStampById)
  .patch(verifyToken, updateStampById)
  .delete(verifyToken, deleteStampById);

module.exports = router;
