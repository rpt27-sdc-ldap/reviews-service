import React from "react";
import ReactDOM from "react-dom";
import Stars from "./stars.js";
import User from "./user.js";

function reviewBody(props) {
  let reviews = [];
  for (let i = 0; i < props.reviews.length; i++) {
    let singleReview = props.reviews[i];
    if (singleReview.display === true) {
      reviews.push(singleReview);
    }
  }
  reviews = reviews.slice(0, props.itemsToShow);
  const reviewItems = reviews.map((review, i) =>
  <div key={i} className="columnsContainers">
    <div className="column left">
        <Stars review={review} />
        <User review={review} />
      </div>
      <div className="column right">
        <h4 className="reviewTitle">
          {review.reviewTitle}
        </h4>
        <span className="reviewBodyText">
          {review.review}
        </span>
        <div className="foundHelpful">
          {review.foundHelpful} found this helpful
        </div>
      </div>
    </div>
);
  return (
    <div className="reviewBody">{reviewItems}</div>
  );
}

export default reviewBody