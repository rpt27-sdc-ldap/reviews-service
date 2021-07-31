require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const port = 4001;
app.use('/books/:id', express.static(path.join(__dirname, '..', 'dist')));
const db = require('../Database/postgres.js');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
const {
  reviewGetter,
  arrayOfIdsReviewGetter,
  createReview,
  readReview,
  updateReview,
  deleteReview
} = require('./serverHelpers');
const AmpOptimizerMiddleware = require('@ampproject/toolbox-optimizer-express');

app.use('/books/:id/reviews', AmpOptimizerMiddleware.create());


//______This route returns all reviews on page load.
//______It returns {reviewerName: String,reviewerId: Number,review: String,urlString: String,bookName: String,bookId: Number,date: Date,overallStars: Number,performanceStars: Number,storyStars: Number,title: String,foundHelpful: Number,source: String, location: String}
//______This route fires on page load since this is a route integral to the initial structure of the page
app.get('/books/:id/reviews', (req, res) => {
  const id = req.params.id;
  res.set({"Cache-Control": "public", 'Access-Control-Allow-Origin': '*'})
  reviewGetter(req, res, id);
});

//CRUD operations

//Read
app.get('/books/:id/reviews/author/:author', (req, res) => {
  const {id, author} = req.params;
  db.handler(req, res, readReview(id, author));
});

//Delete
app.delete('/books/:id/reviews/author/:author', (req, res) => {
  const {id, author} = req.params;
  db.handler(req, res, deleteReview(id, author));
});

//Create
app.post('/books/:id/reviews/author/:author', (req, res) => {
  const {id, author} = req.params;
  db.handler(req, res, createReview(id, author, req.body));
});

//update
app.patch('/books/:id/reviews/author/:author', (req, res) => {
  const {id, author} = req.params;
  db.handler(req, res, updateReview(id, author, req.body));
});

//_____This route returns reviews for carousel data such as when one wants review data for recommended books and related books.
//_____It takse in an object formatted with book ids as the key {ids: [1, 2, 3, etc.]}
//_____This will return an array of objects with: bookId, reviewTitle, reviewerName, and reviewData.
app.post('/reviews/carouselReviews', (req, res) => {
  let idArray = req.body.ids;
  res.set({'Access-Control-Allow-Origin': '*'})
  arrayOfIdsReviewGetter(req, res, idArray)
})

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})

