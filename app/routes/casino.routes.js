module.exports = app => {
  const casino = require("../controllers/casino.controller.js");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/countries", casino.getCountries);
  router.get("/brands", casino.getBrands);
  router.get("/categories", casino.getCategories);
  router.get("/games", casino.getGames);

  app.use('/api/casino', router);
};
