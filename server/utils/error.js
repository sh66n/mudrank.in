const errorResponse = (res, e) => {
  return res.status(500).json({
    error: e,
    message: "Internal Server error",
  });
};

module.exports = errorResponse;
