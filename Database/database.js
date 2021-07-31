const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fec', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We\'re Connected!');
});

const reviewSchema = new mongoose.Schema({
  reviewerName: String,
  reviewerId: Number,
  review: String,
  urlString: String,
  bookTitle: String,
  bookId: Number,
  date: Date,
  overallStars: Number,
  performanceStars: Number,
  storyStars: Number,
  reviewTitle: String,
  foundHelpful: Number,
  source: String,
  location: String
});

reviewSchema.index({bookId: 1, reviewerId: 1}, {unique: true});
const Review = mongoose.model('Review', reviewSchema);

const database = {};

database.create = (review) => {
  return Review.create(review);
}

database.read = (bookId, reviewerId) => {
  if (reviewerId === undefined) {
    return Review.find({bookId});
  }
  return Review.findOne({bookId, reviewerId});
}

database.update = (bookId, reviewerId, review) => {
  return Review.findOneAndUpdate({bookId, reviewerId}, update, {new: true});
}

database.delete = (bookId, reviewerId) => {
  return Review.findOneAndDelete({bookId, reviewerId});
}

database.handler = (req, res, query) => {
  query.then(data => {
    if (data === null) {
      res.sendStatus(404);
    } else {
      res.json(data);
    }
  })
  .catch(err => {
    if (err.code === 11000) {
      res.status(403).json({message: "Duplicate entry not permited"});
    } else {
      res.sendStatus(500);
    }
    console.error(err);
  });
}
module.exports = database;