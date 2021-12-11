module.exports = (sequelize, Sequelize) => {
  const Brands = sequelize.define("brands", {
    brand: {
      type: Sequelize.STRING
    },
    stage_url: {
      type: Sequelize.STRING
    },
    enabled: {
      type: Sequelize.TINYINT
    }
  }, {
    freezeTableName: true
  });

  return Brands;
};
