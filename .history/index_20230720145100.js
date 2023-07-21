import express from "express";
import bodyParser from "body-parser";
import { engine } from 'express-handlebars';
import SettingsBill from "./settings-billjs.js";

const settingsBill = SettingsBill()
let app = express();
app.engine('handlebars', engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

app.get("/", function (req, res) {
  res.render("index");
});

app.post('/settings', function(req, res) {
  console.log(req.body)
 
  settingsBill.setSettings({
    callCost: req.body.callCost
  })
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
