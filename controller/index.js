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

const updateScore = (req, res, end) => {

  const columnName = req.body.columnName;

  db.UserCountry.find({ 
    where: { 
      UserId: req.body.userId,
      CountryId: req.body.countryId
    }
  })
  .then(userCountry => {
    console.log('FOUND IT', userCountry.dataValues);
    if (userCountry) {
      userCountry.updateAttributes({
        [columnName]: req.body.newValue
      })
    }
  });

}

exports.updateUser = updateUser;
exports.getCountries = getCountries;
exports.updateScore = updateScore;
