const fs = require('fs');
const db = require('../database');
const request = require('request');
const geojson = require('./countrygeojson.js');
console.log('FILE LOADED');

/* POPULATE DB FROM API */
const populateDatabase = () => {
  fs.readFile(__dirname + '/countrycodes.txt', 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR in readFile: ', err);
    } else {
      const countryCodes = data.split('\n')
      countryCodes.forEach(code => {
        request(`https://restcountries.eu/rest/v2/alpha/${code}`, function (err, response, body) {
          if (err) {
            console.log('ERROR in forEachCountry: ', err);
          } else {
            const geometry = geojson.features.find((el) => { 
              return el.id === code;
            });
            const country = JSON.parse(body);
            country.geometry = geometry;
            country.code = code;
            findOrWriteCountryToDb(country, code, geometry);
          }
        });
      });
    }
  });
}




const findOrWriteCountryToDb = (country, code, geometry) => {
  const findOptions =  {
    name: country.name //Don't overwrite existing country!
  }

  const geo = JSON.stringify(geometry);
  //console.log('GEOEOEOOE', geo);

  const createOptions = {
    geometry: geo,
    name: country.name,
    capital: country.capital,
    currency: country.currencies[0].name,
    population: country.population,
    language: country.languages[country.languages.length - 1].name,
    flag: country.flag,
    code: country.alpha3Code, 
  }

  console.log('CREATE', createOptions);

  db.Country.sync()
  .then(() => {
    db.Country.findOrCreate({
      where: findOptions,
      defaults: createOptions
    });
  });
}

// fs.readFile(__dirname + '/countryobjects.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.log('ERROR in readFile for countryObjects', err);
//   } else {
//     const countryObjs = JSON.parse(data).countries;
//     countryObjs.forEach(countryObj => {
//       findOrWriteCountryToDb(countryObj);
//     });
//   }
// });

exports.populateDatabase = populateDatabase;

