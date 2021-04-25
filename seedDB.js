const Review = require ('./database.js');
const Faker = require ('faker');
const moment = require('moment');
// const deepai = require('deepai');
// deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');
const randomDate = require('./seedDBHelperFunctions').randomDate;
const reviewGenerator = require('./seedDBHelperFunctions').reviewGenerator;
const sentenceGenerator = require('./seedDBHelperFunctions').sentences;
const wordGenerator = require('./seedDBHelperFunctions').words;
const paragraphGenerator = require('./seedDBHelperFunctions').paragraphs;
const imageGetterFunction  = require('./imagesObject.js').imageGetter;
let imageObj = {};
var Promise = require("bluebird");
function getImageUrls() {
  return new Promise(function (resolve, reject) {
    imageGetterFunction(resolve);
  })
  .then((data) => {
    imageObj = data;
    const dbObject = {};
    for (let i = 0; i < 100; i++) {
      const reviewCount = Math.floor(50 * Math.random());
      for (j = 0; j < reviewCount; j++) {
        const reviewObject = {};
        reviewObject.bookId = i;
        const reviewerId = Math.floor(100 * Math.random());
        reviewObject.reviewerId = reviewerId;
        const name = Faker.name.findName();
        const imageUrl = Faker.image.animals();
        if (dbObject[reviewerId] === undefined) {
          reviewObject.reviewerName = name;
          dbObject[reviewerId] = name;
        } else {
          reviewObject.name = dbObject[reviewerId];
        }
        const urlString = 'imageUrl' + reviewerId.toString();
        if (dbObject[urlString] === undefined) {
          dbObject[urlString] = imageUrl;
          reviewObject.urlString = imageUrl;
        } else {
          reviewObject.urlString = dbObject[urlString];
        }
        const overallStars = Math.floor(Math.random() * 5) + 1;
        const storyStars = Math.floor(Math.random() * 5) + 1;
        const performanceStars = Math.floor(Math.random() * 5) + 1;

        reviewObject.overallStars = overallStars;
        reviewObject.storyStars = storyStars;
        reviewObject.performanceStars = performanceStars;

        let date = randomDate(new Date(2015, 0, 1), new Date());
        reviewObject.date = date;
        const foundHelpful = Math.floor(Math.random() * 300);
        reviewObject.foundHelpful = foundHelpful;
        if(foundHelpful % 10 === 0) {
          reviewObject.source = 'Amazon';
        } else {
          reviewObject.source = 'Audible';
        }
        if (foundHelpful % 15 === 0) {
          reviewObject.location = 'Canada';
        } else {
          reviewObject.location = 'United States';
        }
      }
    }



  })
  .catch((err) => {
    console.log(err);
  })
}
getImageUrls();



