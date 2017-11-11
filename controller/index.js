const db = require('../database');
const Sequelize = require('sequelize');
const _ = require('underscore');
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
    res.write(JSON.stringify(userObj));
    res.end();
  });
}

const getCountries = (req, res, next) => {
  db.UserCountry.findAll({
    where: { UserId: req.query.userid, flag: false },
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
      countryData = {
        targetCountry: randomUserCountryArr[0].dataValues,
        countries: _.shuffle(countrySelection)
      }
      res.write(JSON.stringify(countryData));
      res.end();
    })
  })
}

const updateUserCountryScore = (req, res, next) => {

  const columnName = req.body.columnName;
  const userId = req.body.userId;
  req.userId = userId;

  db.UserCountry.find({ 
    where: { 
      UserId: userId,
      CountryId: req.body.countryId
    }
  })
  .then(userCountry => {
    if(!userCountry) {
      throw 'ERROR: UserCountry not found';
    } else {
      userCountry.updateAttributes({[columnName]: req.body.newValue});
      console.log('USERCOUT', userCountry.dataValues); //why does this work if the above returns a promise??
      const newScore = userCountry.dataValues.flag +
        userCountry.dataValues.capital +
        userCountry.dataValues.currency +
        userCountry.dataValues.population;
      
      return userCountry.updateAttributes({ score: newScore }); //returns a promise!
    }
  }).then(()=> {
    next();
  }).catch(err => {
    console.log(err);
  })
}

const getRecaluculatedUserScore = (req, res, next) => {
  db.UserCountry.findAll({
    where: { UserId: req.userId }
  })
  .then(countriesArr => {
    req.userScore = 0;
    countriesArr.forEach(country => {
      req.userScore += country.dataValues.score;
    });
    console.log('USER SCORE', req.userScore);
    return db.User.find({ 
      where: { 
        id: req.userId,
      }
    });
  }).then((user) => {
    if(!user) {
      throw 'ERROR: user not found';
    } else {
      return user.updateAttributes({score: req.userScore});
    }
  }).then(() => {
    res.write(JSON.stringify(req.userScore));
    res.end();
  })
} 

/*

//update the value of the country rowCol in the db
//update the score of the country row in db
// recalc score

calc ecah country score
calc score and return it
  find all UserCountry where id is userId
  
  
  add score together

  set user score as the result

  




*/

exports.updateUser = updateUser;
exports.getCountries = getCountries;
exports.updateUserCountryScore = updateUserCountryScore;
exports.getRecaluculatedUserScore = getRecaluculatedUserScore;
