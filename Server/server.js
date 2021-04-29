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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const reviewGetter = require('./serverHelpers').reviewGetter;
const arrayOfIdsReviewGetter = require('./serverHelpers').arrayOfIdsReviewGetter;



app.post('/reviews', (req, res) => {
  let id;
  for (var key in req.body) {
    id = key;
  }

  reviewGetter(req, res, id);
});

app.post('/reviews/carouselReviews', (req, res) => {
  let idArray;
  for (var key in req.body) {
    idArray = key;
  }
  idArray = idArray.split(',');
  arrayOfIdsReviewGetter(req, res, idArray)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

