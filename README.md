# Audible Reviews

Audible Reviews is a component in a mock Audible page. Audible Reviews displays the reviews for a given book.


## Usage
```
http://localhost:4000/reviews <bookId>
  # returns
  #reviewerName: String,
  #reviewerId: Number,
  #review: String,
  #urlString: String,
  #bookName: String,
  #bookId: Number,
  #date: Date,
  #overallStars: Number,
  #performanceStars: Number,
  #storyStars: Number,
  #title: String,
  #foundHelpful: Number,
  #source: String,
  #location: String
http://localhost:4000/reviews <arrayOfBookIds>
#returns
#reviewerName: String,
#reviewTitle: string
#date: date,
#overalStars: Number
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[Hack Reactor]
