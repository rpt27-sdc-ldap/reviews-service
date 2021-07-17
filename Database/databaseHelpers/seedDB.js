const Review = require('../database.js');
const Faker = require('faker');
const randomDate = require('./seedDBHelperFunctions').randomDate;
const reviewGenerator = require('./seedDBHelperFunctions').reviewGenerator;
const imageGetterFunction = require('../../S3_Access/imagesObject.js').imageGetter;
const randomImage = require('./seedDBHelperFunctions').randomImage;
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const db = require('../database.js');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

function seedDatabase() {
  let attempted = 0;
  let inserted = 0;
  let total = 0;
  let start = Date.now();
  imageGetterFunction.then(async data => {
    imageObj = data;
    const dbObject = {};
    let itemCount = 10000000;
    let promises = [];
    for (let i = 1; i <= itemCount; i++) {
      const reviewCount = Math.floor(10 * Math.random());
      total += reviewCount;
      let reviews = [];
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
        let numberOfParagraphs = Math.floor(Math.random() * 3) + 1;
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
      }
      promises.push(reviews);
      if (promises.length > 100) {
        await Promise.all(promises.map(async review => {
          return await db.insertMany(review, { ordered: false }).then(data => {
            inserted += data.length;
          }).catch(err => {
            inserted += err?.insertedDocs?.length || 0;
          }).finally(data => {
            attempted++;
            if (attempted % 100 === 0) {
              let end = Date.now();
              let elapsed = end - start;
              console.clear();
              console.log('attempted:', attempted, '/', itemCount, '-', (attempted / itemCount).toFixed(2) + '%');
              console.log('elapsed:', (elapsed / 1000).toFixed(2), 's');
              let rate = attempted / (elapsed / 1000);
              console.log('rate:', rate >> 0, 'items / second')
              let etaSeconds = ((itemCount - attempted) / (rate));
              console.log('Estimated time remaining:', etaSeconds >> 0, 's')
            }
            if (attempted >= itemCount) {
              console.log('\n---\n')
              console.log(`Database Seeded: inserted ${inserted} / ${total}`);
              console.log(`${inserted} inserted in ${elapsed / 1000} seconds`);
              process.exit();
            }
          })
        }));
        promises = [];
      }

    }

  });
}
seedDatabase();


