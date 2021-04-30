import React from "react";
import ReactDOM from "react-dom";
import Stars from "./stars.js"

function reviewBody(props) {
  const reviewItems = props.reviews.map((review, i) =>
  <div key={i}>
    <Stars review={review}/>
    <h2 className="reviewTitle">
      {review.title}
    </h2>
    <span className="reviewBodyText">
      {review.review}
    </span>
    <div className="foundHelpful">
      {review.foundHelpful} found this helpful
    </div>
  </div>
);
  return (
    <div className="reviewBody">{reviewItems}</div>
  );
}

export default reviewBody