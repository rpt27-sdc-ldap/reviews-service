const axios = require('axios');
var config = require('../config.js');
const couchURL = config.couchURL + config.dbName;
const db = {};

db.bulkInsert = async (reviews) => {
  return axios.post(couchURL+'/_bulk_docs', { docs: reviews }).then(res => {
    return reviews.length;
  }).catch(err => {
    console.error('documents could not be written');
    console.error(err.response?.status, err?.response?.data);
    return 0;
  })
}

db.create = async (review) => {

}

db.read = async (bookId, reviewerId) => {

}


db.update = async (bookId, reviewerId, review) => {

}

db.delete = async (bookId, reviewerId) => {
  return axios.post()
}

db.getInfo = async () => {
    return axios.get(couchURL).then(res => {
      console.log({
        db_name: res.data.db_name,
        doc_count: res.data.doc_count,
        sizes: res.data.sizes
      });
  }).catch(res => {
    console.error(res?.data);
  });
}

db.index = () => {

}

db.init = async () => {
  axios.put(couchURL).then(async res => {
    console.log("Database not found - Created new database");
  }).catch(async (err) => {
  if (err.response?.status === 412) {
    console.log('Connected to CouchDB @ localhost:5984');
  } else {
    console.log(err.response?.data?.reason);
  }
  }).finally(async () => {
    return await db.getInfo();
  })
}

module.exports = db;