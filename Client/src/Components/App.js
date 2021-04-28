import React from "react";
import ReactDOM from "react-dom";
import "../../style/main.less";
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.reviewGetter = this.reviewGetter.bind(this);
    this.carouselReviewsGetter = this.carouselReviewsGetter.bind(this);
  }

  reviewGetter () {
    $.ajax({
      url: "http://localhost:4000/reviews",
      data: '1',
      method: 'POST',
      success: (data) => {
        console.log('data', data);
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }
  carouselReviewsGetter () {
    $.ajax({
      url: "http://localhost:4000/reviews/carouselReviews",
      data: '[1, 2, 3, 4, 5, 6, 7]',
      method: 'POST',
      success: (data) => {
        console.log('data', data);
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
        <button className="showMore">
          Show More
        </button>
    </div>
    );
  }
}

export default App;