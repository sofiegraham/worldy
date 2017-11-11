const db = require('../database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const updateUser = (req, res, next) => {
  const findOptions =  {
    name: req.body.name
  }

  const createOptions = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    score: 0,
  }

  db.User.findOrCreate({
    where: findOptions,
    defaults: createOptions
  })
  .then(userBoolArr => {
    let user = userBoolArr[0];
    let bool = userBoolArr[1];

    //get userID

    if(bool) {
      db.Country.findAll({})
      .then(countries => {
        countries.forEach(country => {
          const findOptions =  {
            UserId: user.dataValues.id,
            CountryId: country.dataValues.id,
          }
        
          const createOptions = {
            UserId: user.dataValues.id,
            CountryId: country.dataValues.id,
          }

          db.UserCountry.findOrCreate({
            where: findOptions,
            defaults: createOptions
          })
        })
      });
    }
    
    let userObj = {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
      score: user.dataValues.score
    }

    res.userObj = userObj;
    console.log('user and bool', user.dataValues, bool);
    next();
  });
  
    
    
    //.spread((user, wasCreated) => {  //This spreads the user and bool array into just the user and the boolean.
  //     console.log(user.get({
  //       plain: true
  //     }))
  //     console.log(wasCreated)
  //   })
  // })
}

const getCountries = (req, res, next) => { 
  /*
  get 1 country where the user does not have the flag
    //find all countries where user>flag is false;
    //select one randomly

  get 3 countries randomly
    //select 3 random countries that do not include the one we already got


  send all back


  */
  db.UserCountry.findAll({
    where: { UserId: 1, flag: false },
    order: [ Sequelize.fn( 'RAND' )],
    limit: 1,
    include: [ 'Country' ]
  })
  .then(randomUserCountryArr => {
    const randomCountry = randomUserCountryArr[0].Country;
    db.Country.findAll({
      where: { [Op.not]: [ { id: randomCountry.id }]},
      order: [ Sequelize.fn( 'RAND' )],
      limit: 3
    })
    .then(countriesArr => {
      const countrySelection = countriesArr.map(country => {
        return country.dataValues;
      }).concat([randomCountry.dataValues]);
      res.country = {
        userCountry: randomUserCountryArr[0].dataValues,
        countries: countrySelection
      }
      console.log('COUNTRIES: ', res.country);
    })
  })
}

exports.updateUser = updateUser;
exports.getCountries = getCountries;
//exports.addCountries = addCountries;





// User.sync()
// .then(function() {
//   // Now instantiate an object and save it:
//   return User.create({username: 'Jean Valjean'});
// })

// module.exports = {
//   messages: {
//     get: function (req, res) {
//       db.Message.findAll({include: [db.User]})
//         .then(function(messages) {
//           res.json(messages);
//         });
//     },
//     post: function (req, res) {
//       db.User.findOrCreate({where: {username: req.body.username}})
//         // findOrCreate returns multiple resutls in an array
//         // use spread to assign the array to function arguments
//         .spread(function(user, created) {
//           db.Message.create({
//             userid: user.get('id'),
//             text: req.body.message,
//             roomname: req.body.roomname
//           }).then(function(message) {
//             res.sendStatus(201);
//           });
//         });
//     }
//   },

//   users: {
//     get: function (req, res) {
//       db.User.findAll()
//         .then(function(users) {
//           res.json(users);
//         });
//     },
//     post: function (req, res) {
//       db.User.findOrCreate({where: {username: req.body.username}})
//         // findOrCreate returns multiple resutls in an array
//         // use spread to assign the array to function arguments
//         .spread(function(user, created) {
//           res.sendStatus(created ? 201 : 200);
//         });
//     }
//   }
// };