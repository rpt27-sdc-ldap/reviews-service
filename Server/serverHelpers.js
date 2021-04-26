const Promise = require('bluebird');
const db = require('../Database/database.js');
const reviewCollection = db.Review;


const reviewGetter = (req, res, id) => {

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
reviewGetter();

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