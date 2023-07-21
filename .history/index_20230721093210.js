
import express from "express";
import bodyParser from "body-parser";
import { engine } from 'express-handlebars';
import SettingsBill from "./settings-billjs.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const settingsBill = SettingsBill()
let app = express();
app.engine('handlebars', engine({
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

app.get("/", function (req, res) {
  res.render("index", {
    settings: settingsBill.getSettings(),
  });
});

app.post('/settings', function(req, res) {
  
  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  })

  
  res.redirect('/')
})

app.post('/action', function(req, res) {

  settingsBill.recordAction(req.body.actionType)
    
  res.redirect('/')
})

app.get('/actions', function(req, res) {
    
})

app.get('/actions:type', function(req, res) {
    
})



const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
  console.log("App started at port", PORT);
});
