require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

const connectDb = require("./connection");
connectDb("mongodb://127.0.0.1:27017/mudrank");

const { verifyToken } = require("./middlewares");

const cors = require("cors");
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/api", authRoutes);

const User = require("./models/user");
app.get("/api/users", verifyToken, async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
