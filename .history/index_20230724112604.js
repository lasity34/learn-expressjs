import express from "express";
import session from 'express-session';
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import SettingsBill from "./settings-billjs.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
const settingsBill = SettingsBill();
let app = express();
app.engine(
  "handlebars",
  engine({
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "main",
  })

);
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(session({
  secret: process.env.SECRET, // replace with your own secret value
  resave: false,
  saveUninitialized: true
}));

app.get("/", function (req, res) {
  const modalMessage = req.session.modalMessage;
  console.log('Modal Message:', modalMessage); // Log just the modalMessage
  req.session.modalMessage = null; 
  console.log('Session:', req.session); // Log the entire session

  res.render("index", {
    settings: settingsBill.getSettings(),
    totals: settingsBill.totals(),
    disableAdd: settingsBill.disableButton(),
    hasWarningLevel: settingsBill.hasReachedWarningLevel(),
    hasCriticalLevel: settingsBill.hasReachedCriticalLevel(),
    backToNormal: settingsBill.backToNormal(),
    modalMessage: modalMessage
  });
});


app.post("/settings", function (req, res) {
  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel
  });

  req.session.modalMessage = "Settings have been updated.";
  res.json({ modalMessage: "Settings have been updated." });
});



app.post("/action", function (req, res) {
  settingsBill.recordAction(req.body.actionType);

  res.redirect("/");
});

app.get("/actions", function (req, res) {
  res.render("actions", {
    actions: settingsBill.actions(),
  });
});

app.get("/actions/:actionType", function (req, res) {
  const actionsType = req.params.actionType;
  res.render("actions", {
    actions: settingsBill.actionsFor(actionsType),
  });
});

app.post('/reset', function (req, res) {
  settingsBill.reset()
  req.session.modalMessage = "Settings have been reset.";
  res.redirect('/');
})


const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
  console.log("App started at port", PORT);
});


  

