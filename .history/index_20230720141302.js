import express from "express";
import { engine } from 'express-handlebars';

let app = express();
app.engine('handlebars', engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get("/", function (req, res) {
  res.render("index");
});

app.post('/settings', function(req, res) {
  console.log(req.body)
  res.redirect('/')
})

app.post('/action', function(req, res) {
    
})

app.get('/actions', function(req, res) {
    
})

app.get('/actions:type', function(req, res) {
    
})



const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
  console.log("App started at port", PORT);
});
