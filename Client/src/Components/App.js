import React from "react";
import ReactDOM from "react-dom";
import "../../style/main.less";
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: '', carouselReviews: ''};
    this.getReviews = this.getReviews.bind(this);
    this.getCarouselReviews = this.getCarouselReviews.bind(this);
  }

  getReviews () {
    $.ajax({
      url: "http://localhost:4000/reviews",
      data: '1',
      method: 'POST',
      success: (data) => {
        this.setState({reviews: data})
        return data;
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }
  getCarouselReviews() {
    $.ajax({
      url: "http://localhost:4000/reviews/carouselReviews",
      data: '[1, 2, 3, 4, 5, 6, 7]',
      method: 'POST',
      success: (data) => {
        this.setState({carouselReviews: data});
        return data;
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }

  componentDidMount() {
    this.getReviews();
    this.getCarouselReviews();
  }

  render() {
    return (
    <div>Hello World</div>
    );

  }
}

export default App;