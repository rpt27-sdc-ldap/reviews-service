var AWS = require('aws-sdk');
var config = require('../config.js');

AWS.config.update(
  {
    accessKeyId: config.key,
    secretAccessKey: config.secretKey,
  }
);
var imageUrls = {};
var s3 = new AWS.S3();

let imageGetter = new Promise(function(resolve, reject) {
  s3.listObjects(
    { Bucket: "reviewimagesbucket" },
    function (error, data) {
      if (error != null) {
        reject(error);
      } else {
        for (var i = 0; i < data.Contents.length; i++) {
          imageUrls[i] = 'https://reviewimagesbucket.s3-us-west-1.amazonaws.com/' + data.Contents[i].Key
        }
        resolve(imageUrls);
      }
    }
  );
});

module.exports.imageGetter = imageGetter;

