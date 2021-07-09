const Faker = require ('faker');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const randomDate = require('./seedDBHelperFunctions').randomDate;
const imageGetterFunction  = require('../../S3_Access/imagesObject.js').imageGetter;
const randomImage = require('./seedDBHelperFunctions').randomImage;
const db = require('../database.js');
var csvWriter = require('csv-write-stream')
const { createWriteStream, stat, writeFile } = require('fs');
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

function seedDB() {
  let total = 0;
  let lastSize = -1;
  const start = Date.now();
  const csvPath = path.resolve(__dirname, '../../mega.csv');
  writeFile(csvPath, '', () => {});
  imageGetterFunction.then(async data => {
    const stream = csvWriter({seperator: '\t'});

    const writeStream = createWriteStream(csvPath, {flags: 'w'});

    stream.pipe(writeStream).on('finish', () => {
      const end = Date.now();
      console.log(total, 'reviews written in', (end - start) / 1000 >> 0, 's');
      process.exit();
    });

    function watchFile() {
      stat(csvPath, (err, stats) => {
        let kb = stats.size / 1000;
        let mb = (kb / 10 >> 0) / 100;
        let gb = (mb / 10 >> 0) / 100;
        console.clear();
        if (mb < 1000) {
          console.log(mb, 'MB');
        }
        if (gb >= 1) {
          console.log(gb, 'GB');
        }
        console.log((Date.now() - start) / 1000 >> 0, 's elapsed')
        if (lastSize === stats.size) {
          stream.end();
        } else {
          lastSize = stats.size;
        }
        setTimeout(watchFile, 1000);
      });
    }

    watchFile();

    imageObj = data;
    const dbObject = {};
    let itemCount = 10000000;
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
        if (!stream.write(reviewObject)) {
          lastChanged = Date.now();
          await new Promise (resolve => stream.once('drain', resolve));
        }
        if (i === itemCount) {
          console.log(reviewCount)
        }
      }
    }
  });
}

seedDB();