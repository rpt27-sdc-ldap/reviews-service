const Faker = require ('faker');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const randomDate = require('./seedDBHelperFunctions').randomDate;
const imageGetterFunction  = require('../../S3_Access/imagesObject.js').imageGetter;
const randomImage = require('./seedDBHelperFunctions').randomImage;
const db = require('../couchdb.js');
const dbChoice = 'couch' //or postgres
const path = require('path');
const lorem = new LoremIpsum({

  sentencesPerParagraph: {
    max: 4,
    min: 2
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

async function seedDB() {
  let total = 0;
  const start = Date.now();
  await db.init();
  let currentConnections = 0;
  const maxConnections = dbChoice === 'couch' ? 10 : 1;
  imageGetterFunction.then(async data => {
    imageObj = data;
    const dbObject = {};
    let itemCount = 10000000;
    let reviews = [];
    let lastTime = Date.now();
    let inserted = 0;
    for (let i = 1; i <= itemCount; i++) {
      const reviewCount = Math.floor(10 * Math.random());
      total += reviewCount;
      for (j = 0; j < reviewCount; j++) {
        const reviewObject = {};
        reviewObject.bookId = i;
        const reviewerId = Math.floor(10000 * Math.random());
        reviewObject.reviewerId = reviewerId;
        const name = Faker.name.findName();
        const imageUrl = randomImage(imageObj);
        if (dbObject[reviewerId] === undefined) {
          reviewObject.reviewerName = name;
          dbObject[reviewerId] = name;
        } else {
          reviewObject.reviewerName = dbObject[reviewerId];
        }
        const urlString = 'imageUrl' + reviewerId.toString();
        if (dbObject[urlString] === undefined) {
          dbObject[urlString] = imageUrl;
          reviewObject.urlString = imageUrl;
        } else {
          reviewObject.urlString = dbObject[urlString];
        }
        const overallStars = Math.floor(Math.random() * 5) + 1;

        function randomIntFromInterval(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function minMax(value, min, max) {
          value = Math.min(value, max);
          return Math.max(value, min);
        }

        let storyStars = minMax(randomIntFromInterval((overallStars - 2), (overallStars + 2)), 1, 5);
        let performanceStars = minMax(randomIntFromInterval((overallStars - 1), (overallStars + 2)), 1, 5);

        reviewObject.overallStars = overallStars;
        reviewObject.storyStars = storyStars;
        reviewObject.performanceStars = performanceStars;

        let date = randomDate(new Date(2015, 0, 1), new Date());
        reviewObject.date = date;
        const foundHelpful = Math.floor(Math.random() * 100);
        reviewObject.foundHelpful = foundHelpful;
        if (foundHelpful % 10 === 0) {
          reviewObject.source = 'Amazon';
        } else {
          reviewObject.source = 'Audible';
        }
        if (foundHelpful % 5 === 0) {
          reviewObject.location = 'Canada';
        } else {
          reviewObject.location = 'United States';
        }
        let numberOfParagraphs = Math.floor(Math.random() * 1) + 1;
        let numberOfSentences = Math.floor(Math.random() * 7) + 1;
        let conditional = Math.random() * 5;
        if (conditional < 4) {
          reviewObject.review = lorem.generateParagraphs(numberOfParagraphs);
        } else {
          reviewObject.review = lorem.generateSentences(numberOfSentences);
        }
        let numberOfWords = Math.floor(Math.random() * 6);
        reviewObject.reviewTitle = lorem.generateWords(numberOfWords);
        reviews.push(reviewObject);

        //db-independant bulk-insert
        let insertionLength = 2000;
        if (reviews.length >= insertionLength) {
          function addHandler(added) {
            inserted += added;
            console.clear();
            const time = (Date.now() - lastTime);
            console.log('inserted', added, 'in', time / 1000, 's');
            inserted += added;
            lastTime = Date.now();
            const duration = (lastTime - start) / 1000;
            const estimatedCount = itemCount * 5;
            console.log(inserted, '/ ~', estimatedCount, duration, 's elapsed', ((inserted / estimatedCount) * 100).toFixed(2), "% complete" )
            console.log(inserted / duration, 'documents / s')
            const rps = inserted / duration;
            console.log('ETA: ', (estimatedCount - inserted) / rps, 's, or ', (estimatedCount - inserted) / rps / 60, 'minutes')
            reviews = [];
            currentConnections--;
          };
          currentConnections++;
          if (currentConnections < maxConnections) {
            db.bulkInsert(reviews).then(addHandler).catch(console.error);
          } else {
            await db.bulkInsert(reviews).then(addHandler);
          }

          }


        if (i === itemCount) {
          console.log(reviewCount)
        }
      }
    }
  });
}

seedDB();