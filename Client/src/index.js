import React from "react";
import ReactDOM from "react-dom";
import "./style/main.less";
import App from './Components/App.js';

class Welcome extends React.Component {
  render() {
    return <App />;
  }
}
ReactDOM.render(<Welcome />, document.getElementById("root"));