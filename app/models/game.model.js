module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("game", {
    name: {
      type: Sequelize.STRING
    },
    publisher: {
      type: Sequelize.STRING
    },
    launchcode: {
      type: Sequelize.BOOLEAN
    },
    image: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.TINYINT
    }
  }, {
    freezeTableName: true
  });

  return Game;
};
