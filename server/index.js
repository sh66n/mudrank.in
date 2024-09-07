const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

const connectDb = require("./connection");
connectDb("mongodb://127.0.0.1:27017/mudrank");

const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
