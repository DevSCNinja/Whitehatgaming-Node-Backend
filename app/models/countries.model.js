module.exports = (sequelize, Sequelize) => {
  const Countries = sequelize.define("countries", {
    code: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    country: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  return Countries;
};
