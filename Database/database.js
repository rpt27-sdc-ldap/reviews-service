const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fec', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We\'re Connected!')

});
const reviewSchema = new mongoose.Schema({
  reviewerName: String,
  reviewerId: Number,
  review: String,
  urlSTring: String,
  bookId: Number,
  date: Date,
  overallStars: Number,
  performanceStars: Number,
  storyStars: Number,
  title: String,
  foundHelpful: Number,
  source: String,
  location: String
});

const Review = mongoose.model('Review', reviewSchema);



module.exports.Review = Review;