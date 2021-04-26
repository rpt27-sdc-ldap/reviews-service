import React from "react";
import ReactDOM from "react-dom";
import "../style/main.less";
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
  }
  render() {
    return <div></div>;
  }
}

export default App;