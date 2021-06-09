const app = require('express')();

app.get("/test", function (req, res) {
  console.log("endpoint hit");
  res.send("<b>Hi</b>")
});

module.exports = app;
