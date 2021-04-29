const Promise = require('bluebird');
const db = require('../Database/database.js');
const reviewCollection = db.Review;


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
          res.send(data);
        })
        .catch((error) => {
          res.send(error);
        })
    })
    .catch((error) => {
      console.log(error);
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
        data = await reviewCollection.find({ bookId: {$in: idArray} }, {bookId: true, reviewerName: true, title: true, date: true, overallStars: true});
        resolve(data);
      })
        .then((data) => {
          res.send(data);
        })
        .catch((error) => {
          res.send(error);
        })
    })
    .catch((error) => {
      console.log(error);
    })
}


module.exports.reviewGetter = reviewGetter;
module.exports.arrayOfIdsReviewGetter = arrayOfIdsReviewGetter;