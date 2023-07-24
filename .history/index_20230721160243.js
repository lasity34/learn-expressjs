import express from "express";
import bodyParser from "body-parser";
import { engine } from "express-handlebars";
import SettingsBill from "./settings-billjs.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

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

app.get("/", function (req, res) {
  let updatedSettings = settingsBill.getSettings();
  let updatedTotals = settingsBill.totals();
  let disableAddButton = settingsBill.disableButton();
  let hasReachedWarning = settingsBill.hasReachedWarningLevel();
  let hasReachedCritical = settingsBill.hasReachedCriticalLevel();

  res.render("index", {
    settings: updatedSettings,
    totals: updatedTotals,
    disableAdd: disableAddButton,
    hasWarningLevel: hasReachedWarning,
    hasCriticalLevel: hasReachedCritical,
  });
});

app.post("/settings", function (req, res) {
  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel,
  });

  res.redirect("/");
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
  res.redirect('/');
})


const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
  console.log("App started at port", PORT);
});

console.log(settingsBill.hasReachedCriticalLevel())


