const express = require('express');
const bodyParser = require('body-parser')
const ctrl = require('../controller');
const fs = require('fs');
const request = require('request');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/public'));

const PORT = process.env.PORT || 1234;

app.post('/user', ctrl.addUserIfNotExisting);

app.post('/login', ctrl.getUserData, ctrl.getUserCountryData, (req, res, next) => {
  const userObj = {
    id: req.userData.id,
    name: req.userData.name,
    email: req.userData.email,
    score: req.userData.score,
    countries: req.userCountryData
  }
  res.write(JSON.stringify(userObj));
  res.end();
});

app.post('/score', ctrl.updateUserCountryScore, ctrl.getRecaluculatedUserScore);

app.get('/game/flag', ctrl.getCountries);

app.get('/countries', ctrl.getAllCountryData);

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});