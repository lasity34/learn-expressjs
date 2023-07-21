import express from "express";

let app = express();

app.get("/", function (req, res) {
  res.send("App is Working");
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log("App started at port", PORT);
});
