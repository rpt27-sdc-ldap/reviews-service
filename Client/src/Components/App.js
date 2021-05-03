import React from "react";
import ReactDOM from "react-dom";
import "../../style/main.less";
import $ from 'jquery';
import ReviewBody from './reviewBody';
import SortBy from './sortBy';
import FilterBy from './filterBy';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: [], carouselReviews: [], };
    this.reviewGetter = this.reviewGetter.bind(this);
    this.carouselReviewsGetter = this.carouselReviewsGetter.bind(this);
  }

  sortReviews (e) {
    console.log(e);
  }

  reviewGetter () {
    $.ajax({
      url: "http://localhost:4000/reviews",
      data: {id: 2},
      method: 'POST',
      success: (data) => {
        for (let i = 0; i < data.length; i++) {
          let htmlReview = data[i].review.split('<br>');
          let htmlJoin = htmlReview.join("\n\n");
          data[i].review = htmlJoin;
          console.log(data[i].review)
        }
        this.setState({reviews: data});
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }
  carouselReviewsGetter () {
    $.ajax({
      url: "http://localhost:4000/reviews/carouselReviews",
      data: {ids: [1, 2, 3, 4, 5, 6, 7]},
      method: 'POST',
      success: (data) => {
        this.setState({carouselReviews: data})
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }

  componentDidMount() {
    this.reviewGetter();
    this.carouselReviewsGetter();
  }
  render() {
    return (
      <div className={"reviewsShell"}>
        <nav>
          <h2 className={"Audible"}>Audible.com Reviews</h2>
          <h2 className={"Amazon"}>Amazon.com Reviews</h2>
        </nav>
        <span className="greyBar">
          <hr></hr>
        </span>
        <div className="filters">
          <SortBy sortReviews={this.sortReviews}/>
          <FilterBy />
        </div>
        <div>
          <ReviewBody className="reviewBody" reviews={this.state.reviews.slice(0, 20)} />
        </div>
        <button className="showMore">
          Show More
        </button>
      </div>
    );
  }
}

export default App;