const express = require('express');
const app = express();
const path = require('path');
const port = 4000;
let pathName = path.join(__dirname, '../dist');
const db = require('../Database/database.js');
const reviewCollection = db.Review;
app.use(express.static(pathName));
const Promise = require('bluebird');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const reviewGetter = require('./serverHelpers').reviewGetter;


app.post('/reviews', (req, res) => {
  let id;
  for (var key in req.body) {
    id = key;
  }

  reviewGetter(req, res, id);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

