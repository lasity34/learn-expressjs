import express from "express";

let app = express();

app.get("/", function (req, res) {
  res.render("index");
});

app.post('/settings', function(req, res) {

})

app.post('/action', function(req, res) {
    
})

app.get('/actions', function(req, res) {
    
})

app.get('/actions:type', function(req, res) {
    
})



const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
  console.log("App started at port", PORT);
});
