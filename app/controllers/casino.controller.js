const db = require("../models");
const { QueryTypes } = require('sequelize');

const Countries = db.countries;
const Brands = db.brands;
const Category = db.category;
const Op = db.Sequelize.Op;


// Retrieve all Countries from the database.
exports.getCountries = (req, res) => {
  Countries.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving countries."
      });
    });
};

// Retrieve all Brands from the database.
exports.getBrands = (req, res) => {
  var condition = { enabled: { [Op.eq]: 1 }, id: { [Op.ne]: 0 } };

  Brands.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving brands."
      });
    });
};

// Retrieve all Categories from the database.
exports.getCategories = (req, res) => {
  const brandid = req.query.brandid;
  var condition = {
      brandid: { [Op.eq]: brandid },
      active: { [Op.eq]: 1 },
      name: { [Op.ne]: '' },
      category: { [Op.ne]: 'all' }
    };

  Category.findAll({
    attributes: ['id', 'name', 'category', 'brandid', 'active'],
    group: ['category'],
    where: condition 
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving brands."
    });
  });
};

// Retrieve all Games from the database.
exports.getGames = async(req, res) => {
  const country = req.query.country;
  const brandid = req.query.brandid;
  const category = req.query.category;
  var condition = brandid ? ` brandid=${brandid} ` : 'true';
  condition += category!='all' ? ` AND category='${category}' ` : '';

  const games = await db.sequelize.query(
    `SELECT t1.id, t1.name, t1.launchcode, t1.active, t1.game_provider_id, t1.game_provider_name, t1.rtp, t0.hot, t0.new FROM
    (
      SELECT * FROM (SELECT DISTINCT launchcode, hot, new FROM brand_games WHERE ${condition}) AS t0 WHERE t0.launchcode NOT IN 
      (
        SELECT launchcode FROM game_brand_block WHERE brandid=${brandid}
        UNION
        SELECT launchcode FROM game_country_block WHERE country='${country}'
      )
    ) AS t0
    LEFT JOIN
    (
      SELECT t0.*, t1.name AS game_provider_name FROM game AS t0
      LEFT JOIN game_providers AS t1
      ON t0.game_provider_id = t1.id
    ) AS t1
    ON t0.launchcode = t1.launchcode`, { type: QueryTypes.SELECT }
  );
  res.send(games)
};