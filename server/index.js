var express = require('express');
const app = express();
const bodyParser = require('body-parser')
const db = require('../database');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/public'));

let port = process.env.PORT || 1234;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});