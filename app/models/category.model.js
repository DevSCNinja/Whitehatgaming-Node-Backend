module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    brandid: {
      type: Sequelize.TINYINT
    }
  }, {
    freezeTableName: true
  });

  return Category;
};
