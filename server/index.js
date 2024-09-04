const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.send("server!");
});

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
