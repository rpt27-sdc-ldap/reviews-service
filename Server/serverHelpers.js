const Promise = require('bluebird');
const db = require('../Database/database.js');
const reviewCollection = db;


const reviewGetter = (req, res, id) => {
  if (res === undefined) {
    return;
  }
  return new Promise(async (resolve, reject) => {
    const data = require('../Database/database.js');
    const review = data.Review;
    resolve(review);
  })
    .then((data) => {
      return new Promise(async (resolve, reject) => {
        data = await reviewCollection.find({ bookId: id });
        resolve(data);
      })
        .then((data) => {
          console.log(data);
          let reviews = data.filter(review => review.review !== undefined || review.title !== undefined);
          for (let i = 0; i < reviews.length; i++) {
            let reviewArray = reviews[i].review?.split('\n');
            let review = reviewArray?.join('<br>');
            reviews[i].review = review;
          }
          res.send(reviews);
        })
        .catch((error) => {
          console.error(error);
          res.status(500);
          res.send(error);
        })
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.send(error);
    })
}

const arrayOfIdsReviewGetter = (req, res, idArray) => {
  if (res === undefined) {
    return;
  }
  return new Promise(async (resolve, reject) => {
    const data = require('../Database/database.js');
    const review = data.Review;
    resolve(review);
  })
    .then((data) => {
      return new Promise(async (resolve, reject) => {
        data = await reviewCollection.find({ bookId: {$in: idArray} }, {bookId: true, reviewerName: true, title: true, date: true, overallStars: true, reviewTitle: true});
        resolve(data);
       })
        .then((data) => {
          const idsOfAlreadyLoggedBooks = {};
          const arrayOfRecommendedReviews = [];
          for (let i = 0; i < data.length; i++) {
            if (idsOfAlreadyLoggedBooks[data[i].bookId] === undefined) {
              arrayOfRecommendedReviews.push(data[i])
              idsOfAlreadyLoggedBooks[data[i].bookId] = 1;
            }
          }
          res.send(arrayOfRecommendedReviews);
        })
        .catch((error) => {
          console.error(error);
          res.status(500);
          res.send(error);
        })
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.send(error);
    })
}

const createReview = (bookId, reviewerId, review) => {
  review.bookId = bookId;
  review.reviewerId = reviewerId;
  console.log(review);
  review.date = review.date || Date.now();
  review.source = review.source || "Audible";
  review.location = review.source || "United States";
  return reviewCollection.create(review);
};

const updateReview = (bookId, reviewerId, update) => {
  return reviewCollection.findOneAndUpdate({bookId, reviewerId}, update, {new: true});
};

const deleteReview = (bookId, reviewerId) => {
  return reviewCollection.findOneAndDelete({bookId, reviewerId});
};

const readReview = (bookId, reviewerId) => {
  return reviewCollection.findOne({bookId, reviewerId});
};

const dbHandler = (req, res, query) => {
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
module.exports = {
  reviewGetter,
  arrayOfIdsReviewGetter,
  createReview,
  updateReview,
  deleteReview,
  readReview,
  dbHandler
}