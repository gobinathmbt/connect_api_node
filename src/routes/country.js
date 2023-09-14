const country = require("../controllers/country");
const { Router } = require("express");

const app = Router();

app.get("/country",  country);

module.exports = app;