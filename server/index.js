const express = require('express');
const bodyParser = require('body-parser')
const ctrl = require('../controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/public'));

const PORT = process.env.PORT || 1234;

app.post('/user', ctrl.updateUser, (req, res, next) => {
  console.log('posted user');
  res.end();
})

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});