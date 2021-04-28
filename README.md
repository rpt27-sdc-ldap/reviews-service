# Audible Reviews

Audible Reviews is a component in a mock Audible page. Audible Reviews displays the reviews for a given book.

Database Folder includes 2 database helpers: seedDB seeds the database and seedDBHelperFunctions helps with seeding the database. MongoDB database setup is in Database/database.js.

Jest Tests are located in Client/ Tests.

Style sheet is in Client/style. It uses 'less' for CSS.

RenderDom is in Client/index.js. App components are in Client/src/Components

## Usage

The Server with endpoints is in Server/server.js
The two endpoints are /reviews and /reviews/carouselReviews.


http://localhost:4000/reviews (bookId) #returns
  {reviewerName: String,
  reviewerId: Number,
  review: String,
  urlString: String,
  bookName: String,
  bookId: Number,
  date: Date,
  overallStars: Number,
  performanceStars: Number,
  storyStars: Number,
  title: String,
  foundHelpful: Number,
  source: String,
  location: String}

http://localhost:4000/reviews/carouselReviews (arrayOfBookIds) #returns array of infoObjects
{reviewerName: String,
reviewTitle: string
date: date,
overalStars: Number}


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[Hack Reactor]
