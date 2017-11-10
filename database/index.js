var Sequelize = require('sequelize');
var db = new Sequelize('flags', 'root', '', {
  dialect: 'mysql'
});

// we define the models we need using js--we don't need a schema file!
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
});

// puts a UserId column on each Message instance
// also gives us the `.setUser` method available
// after creating a new instance of Message
//Country.belongsTo(User);
// enables bi-directional associations between Users and Messages
//User.hasMany(Country);


User.sync();
Country.sync();
// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.

exports.User = User;
exports.Country = Country;







/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
// User.sync()
// .then(function() {
//   // Now instantiate an object and save it:
//   return User.create({username: 'Jean Valjean'});
// })
// .then(function() {
//   // Retrieve objects from the database:
//   return User.findAll({ where: {username: 'Jean Valjean'} });
// })
// .then(function(users) {
//   users.forEach(function(user) {
//     console.log(user.username + ' exists');
//   });
//   db.close();
// })
// .catch(function(err) {
//   // Handle any error in the chain
//   console.error(err);
//   db.close();
// });