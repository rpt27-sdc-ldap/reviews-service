const LoremIpsum = require("lorem-ipsum").LoremIpsum;

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



module.exports.words = lorem.generateWords;
module.exports.sentences = lorem.generateSentences;
module.exports.paragraphs = lorem.generateParagraphs;

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports.randomDate = randomDate;








// const reviewGenerator = async function (textInput) {
//   var resp = await deepai.callStandardApi("text-generator", {
//     text: textInput,
//   });
//   console.log(resp);
// };

// module.exports.reviewGenerator = reviewGenerator;


// const sentenceGenerator = function () {
//   const adjectives = ['asinine', 'amusing', 'enjoyable',
//   'Busy',
//   'Lazy',
//   'Careless',
//   'Clumsy',
//   'Nimble',
//   'Brave',
//   'Mighty',
//   'Meek',
//   'Clever',
//   'Dull',
//   'Afraid',
//   'Scared',
//   'Cowardly',
//   'Bashful',
//   'Proud'
// ,'Fair'
// ,'Greedy'
// ,'Wise'
// ,'Foolish'
// ,'Tricky'
// ,'Truthful'
// ,'Loyal'
// ,'Happy'
// ,'Cheerful'
// ,'Joyful'
// ,'Carefree'
// ,'Friendly'
// ,'Moody'
// ,'Crabby'
// ,'Cranky'
// ,'Awful'
// ,'Gloomy'
// ,'Angry'
// ,'Worried'
// ,'Excited'
// ]
// }

// module.exports.sentenceGenerator = sentenceGenerator;