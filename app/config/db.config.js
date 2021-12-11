module.exports = {
  HOST: "recruitment-tests-dev.ci7jgzfkdumb.eu-west-1.rds.amazonaws.com",
  USER: "dbadmin",
  PASSWORD: "yhm86LRDXaonNM",
  DB: "recruitmenttestsdevs",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
