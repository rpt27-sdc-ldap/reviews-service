# Audible Reviews

* Is hosted on AWS EC2 instances and S3 buckets

* React

* Node.js

* Express

* MongoDB

* I was responsible for this service. It works on a page with 5 other services to form a mock Audible product page. With our respository located at https://github.com/huang-pei-mei

<a href="url"><img src="screenshotsAndGifs/reviewsWithHeader.png" align="left" height="300px" width="150px"></a>

<a href="url"><img src="screenshotsAndGifs/desktopReviews.png" align="left" height="200px" width="250px"></a>

<a href="url"><img src="screenshotsAndGifs/desktopReviewsGif.gif" align="left" height="250px" width="300px"></a>

<br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />



## Usage

* Audible Reviews is a component in a mock Audible page. Audible Reviews displays the reviews for a given book.

* Database Folder includes 2 database helpers: seedDB seeds the database and seedDBHelperFunctions helps with seeding the database.

* Run node Database/databaseHelpers/seedDB to seed the database

* MongoDB database setup is in Database/database.js.

* Jest Tests are located in Client/ Tests.

* Style sheet is in Client/style. It uses 'less' for CSS.

* RenderDom is in Client/index.js.

* App components are in Client/src/Components

* The Server with endpoints is in Server/server.js

* The two endpoints available are books/:id/reviews and /reviews/carouselReviews

* send <GET> request to http://yourEC2Instance:4001/books/:id/reviews
* returns multiple review objects per id
* {reviewerName: String,
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


* send <GET> request to http://yourEC2Instance:4001/reviews/carouselReviews <arrayOfBookIds> returns array of infoObjects for modals / carousels
* returns one review object per id
* {reviewerName: String,
reviewTitle: string
date: date,
overalStars: Number}

## Installation

```bash

fork 'https://github.com/huang-pei-mei/reviews-service'
git clone /path/to/reviews.git
cd reviews-service
npm install
npm run react-prod
npm run start

```


## Contributing
This page is not currently open to contributions

## License
N/A
