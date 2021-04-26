const reviewGetter = (req, res) => {
  return new Promise((resolve, reject) => {
    resolve(reviewCollection.find({ bookId: req.body }))
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    })
}

module.exports.reviewGetter = reviewGetter;