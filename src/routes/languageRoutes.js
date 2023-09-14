const language = require("../controllers/languageController");
const { Router } = require("express");

const app = Router();

app.get("/languages", language.getAllLanguages);
app.get('/languages/:language_uid', language.getLanguageByUid);
app.post("/languages", language.createLanguage);
app.patch("/languages/:languages_uid", language.updateLanguageByUid);
app.delete("/languages/:languages_uid", language.deleteLanguage);

module.exports = app;
