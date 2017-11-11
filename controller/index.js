const db = require('../database');

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

  db.User.sync()
  .then(() => {
    db.User.findOrCreate({
      where: findOptions,
      defaults: createOptions
    }).then(userBoolArr => {
      let user = userBoolArr[0];
      let bool = userBoolArr[1];

      //get userID

      if(true) {
        db.Country.sync()
        .then(()=> {
          db.Country.findAll({})
          .then(countries => {
            countries.forEach(country => {
              
              const findOptions =  {
                userId: user.dataValues.id,
                countryId: country.dataValues.id,
              }
            
              const createOptions = {
                userId: user.dataValues.id,
                countryId: country.dataValues.id,
                flag: false
              }
              db.UserCountry.sync()
              .then(() => {
                db.UserCountry.findOrCreate({
                  where: findOptions,
                  defaults: createOptions
                })
              })
            })
            console.log('COUNTRIES', countries[0]);
          });
        })
        //create association for user
        //for each country in countries table
          //create association in db
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