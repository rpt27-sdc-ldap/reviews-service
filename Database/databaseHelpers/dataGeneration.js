const Faker = require ('faker');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const randomDate = require('./seedDBHelperFunctions').randomDate;
const imageGetterFunction  = require('../../S3_Access/imagesObject.js').imageGetter;
const randomImage = require('./seedDBHelperFunctions').randomImage;
const db = require('../postgres.js');
const dbChoice = 'postgres' //or postgres
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

function timeToString(seconds = 0) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hours * 3600) / 60);
  const secs = Math.floor(seconds- hours * 3600 - mins * 60);
  return "" + (hours ? hours + 'h ': '') + (mins ? mins + 'm ' : '') + secs + 's';
}

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
    let maxReviewCount = 10;
    for (let i = 1; i <= itemCount; i++) {
      const reviewCount = Math.floor(maxReviewCount * Math.random());
      total += reviewCount;
      for (j = 0; j < reviewCount; j++) {
        const reviewObject = {};
        reviewObject.bookId = i;
        const reviewerId = Math.floor(10000 * Math.random()) + 1;
        reviewObject.reviewerId = reviewerId;
        const name = Faker.name.findName();
        const imageUrl = randomImage(imageObj);
        if (dbObject[reviewerId] === undefined) {
          reviewObject.reviewerName = name;
          dbObject[reviewerId] = { id : reviewerId, name };
        } else {
          reviewObject.reviewerName = dbObject[reviewerId].name;
        }
        const urlString = 'imageUrl' + reviewerId.toString();
        if (dbObject[reviewerId].imageUrl === undefined) {
          dbObject[reviewerId].imageUrl = imageUrl;
          reviewObject.urlString = imageUrl;
          // adds this user info to postgres db
          if (dbChoice === 'postgres') {
            await db.addReviewer(dbObject[reviewerId]);
          }
        } else {
          reviewObject.urlString = dbObject[reviewerId].imageUrl;
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

        let source;
        let location;
        if (foundHelpful % 10 === 0) {
          source = dbChoice !== 'postgres' ? 'Amazon' : 1;
        } else {
          source = dbChoice !== 'postgres' ? 'Audible' : 2;
        }
        if (foundHelpful % 5 === 0) {
          location = dbChoice !== 'postgres' ? 'Canada' : 1;
        } else {
          location = dbChoice !== 'postgres' ? 'United States' : 2;
        }

        // set postgres-specific id
        if (dbChoice === 'postgres') {
          reviewObject.sourceId = source;
          reviewObject.locationId = location;
        } else {
          reviewObject.source = source;
          reviewObject.location = location;
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
        let lastTime = i === itemCount && j === (reviewCount - 1)
        if (reviews.length >= insertionLength || lastTime) {
          const currentIndex = i;
          async function addHandler(added) {
            inserted += added;
            const time = (Date.now() - lastTime);
            console.clear();
            console.log('inserted', added, 'in', time / 1000, 's');
            lastTime = Date.now();
            const duration = (lastTime - start) / 1000;
            const estimatedCount = itemCount * maxReviewCount / 2;
            console.log('id:', currentIndex, '/', itemCount, timeToString(duration), ' elapsed', ((currentIndex / itemCount) * 100).toFixed(2), '% complete')
            console.log(inserted / duration, 'documents / s')
            const rps = currentIndex / duration;
            console.log('ETA: ', timeToString((itemCount - currentIndex) / rps));
            currentConnections--;
            if (lastTime) {
              const duration = (Date.now() - start) / 1000;
              console.log('inserted', inserted, 'records in - ', timeToString(duration));
              return await db.done();
            }
          };
          currentConnections++;
          const data = reviews;
          reviews = [];
          if (currentConnections < maxConnections) {
            db.bulkInsert(data).then(addHandler).catch(console.error);
          } else {
            await db.bulkInsert(data).then(addHandler);
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