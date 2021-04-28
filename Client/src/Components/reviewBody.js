import React from "react";
import ReactDOM from "react-dom";

function reviewBody(props) {
  console.log('hi');
  console.log(props.reviews)
  const reviewItems = props.reviews.map((review, i) =>
  <div key={i}>
    <h1 className="reviewTitle">
      {review.title}
    </h1>
    <span className="reviewBodyText">
      {review.review}
    </span>
    <span className="foundHelpful">
      {review.foundHelpful} found this helpful
    </span>
  </div>
);
  return (
    <div className="reviewBody">{reviewItems}</div>
  );
}

export default reviewBody