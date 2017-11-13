const Sequelize = require('sequelize');
//const initDB = require('./populateDbScript.js'); //UNCOMMENT TO POPULATE
const db = new Sequelize('worldly', 'root', '', {
  dialect: 'mysql'
});

var User = db.define('User', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  score: Sequelize.INTEGER,
});

var Country = db.define('Country', {
  name: Sequelize.STRING,
  capital: Sequelize.STRING,
  currency: Sequelize.STRING,
  population: Sequelize.INTEGER,
  language: Sequelize.STRING,
  flag: Sequelize.STRING,
  code: Sequelize.STRING,
  geometry: Sequelize.TEXT
});

var UserCountry = db.define('UserCountry', {
  flag: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  capital: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  currency: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  population: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  language: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
});

UserCountry.belongsTo(User);
UserCountry.belongsTo(Country);
// also gives us the `.setUser` method



User.sync();
Country.sync();
UserCountry.sync();

//initDB.populateDatabase(); //UNCOMMENT TO POPULATE

exports.User = User;
exports.Country = Country;
exports.UserCountry = UserCountry;