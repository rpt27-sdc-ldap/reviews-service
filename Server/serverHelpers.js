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
          // newData = JSON.parse(data);
          // dataArray = [];
          // for (var i = 0; i < newData.length; i++) {
          //   let returnObject = {};
          //   returnObject.bookId = data[i].bookId;
          //   returnObject.reviewerName = data[i].reviewerName;
          //   returnObject.reviewTitle = data[i].title;
          //   returnObject.date = data[i].date;
          //   dataArray.push(returnObject);
          // }
          // newData = JSON.stringify(dataArray);
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
// reviewGetter();

// const reviewGetter = (req, res, id) => {
//   return new Promise(async (resolve, reject) => {
//     // data = await reviewCollection.find({bookId: id});
//     resolve('hi');
//   })
//   .then((data) => {
//       console.log('id', id)
//       res.send(data);
//     })
//     .catch((error) => {
//       res.send(error);
//     })
// }

module.exports.reviewGetter = reviewGetter;
module.exports.arrayOfIdsReviewGetter = arrayOfIdsReviewGetter;