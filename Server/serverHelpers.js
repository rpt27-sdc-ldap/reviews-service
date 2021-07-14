const Promise = require('bluebird');
const db = require('../Database/postgres.js');
const reviewCollection = db;


const reviewGetter = async (req, res, bookId) => {
  if (res === undefined) {
    return;
  }
  await db.read(bookId)
    .then((data) => {
      let reviews = data.filter(review => review.review !== undefined || review.reviewTitle !== undefined);
      console.log(reviews.length);
      for (let i = 0; i < reviews.length; i++) {
        let reviewArray = reviews[i].review?.split('\n');
        let review = reviewArray?.join('<br>');
        reviews[i].review = review;
      }
      console.log(reviews);
      res.send(reviews);
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
      res.send(error);
    });
 }
const arrayOfIdsReviewGetter = () => {};
// const arrayOfIdsReviewGetter = (req, res, idArray) => {
//   if (res === undefined) {
//     return;
//   }
//   return new Promise(async (resolve, reject) => {
//     const data = require('../Database/database.js');
//     const review = data.Review;
//     resolve(review);
//   })
//     .then((data) => {
//       return new Promise(async (resolve, reject) => {
//         data = await reviewCollection.find({ bookId: {$in: idArray} }, {bookId: true, reviewerName: true, title: true, date: true, overallStars: true, reviewTitle: true});
//         resolve(data);
//        })
//         .then((data) => {
//           const idsOfAlreadyLoggedBooks = {};
//           const arrayOfRecommendedReviews = [];
//           for (let i = 0; i < data.length; i++) {
//             if (idsOfAlreadyLoggedBooks[data[i].bookId] === undefined) {
//               arrayOfRecommendedReviews.push(data[i])
//               idsOfAlreadyLoggedBooks[data[i].bookId] = 1;
//             }
//           }
//           res.send(arrayOfRecommendedReviews);
//         })
//         .catch((error) => {
//           console.error(error);
//           res.status(500);
//           res.send(error);
//         })
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500);
//       res.send(error);
//     })
// }

const createReview = (bookId, reviewerId, review) => {
  review.bookId = bookId;
  review.reviewerId = reviewerId;
  console.log(review);
  review.date = review.date || Date.now();
  review.source = review.source || "Audible";
  review.location = review.source || "United States";
  return db.create(review);
};

const readReview = (bookId, reviewerId) => {
  return db.read(bookId, reviewerId);
};

const updateReview = (bookId, reviewerId, update) => {
  return db.update(bookId, reviewerId, update);
};

const deleteReview = (bookId, reviewerId) => {
  return db.delete(bookId, reviewerId);
};

module.exports = {
  reviewGetter,
  arrayOfIdsReviewGetter,
  createReview,
  updateReview,
  deleteReview,
  readReview
}