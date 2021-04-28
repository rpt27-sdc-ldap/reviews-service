import React from "react";
import ReactDOM from "react-dom";
import "../../style/main.less";
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
  render() {
    return <div>Hello World</div>;
  }
}

export default App;