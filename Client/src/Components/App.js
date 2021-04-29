import React from "react";
import ReactDOM from "react-dom";
import "../../style/main.less";
import $ from 'jquery';
import ReviewBody from './reviewBody';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: [], carouselReviews: []};
    this.reviewGetter = this.reviewGetter.bind(this);
    this.carouselReviewsGetter = this.carouselReviewsGetter.bind(this);
  }

  reviewGetter () {
    $.ajax({
      url: "http://localhost:4000/reviews",
      data: {id: 1},
      method: 'POST',
      success: (data) => {
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
        <div>
        <ReviewBody className="reviewBody" reviews={this.state.reviews.slice(0, 10)}/>
        </div>
        <button className="showMore">
          Show More
        </button>
    </div>
    );
  }
}

export default App;