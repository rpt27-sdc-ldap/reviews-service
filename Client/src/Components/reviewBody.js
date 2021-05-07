import React from "react";
import ReactDOM from "react-dom";
import Stars from "./stars.js";
import User from "./user.js";
import PhoneUserInfo from "./phoneUserInfo";

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
        <PhoneUserInfo review={review} />
      </div>
      <div className="column right">
        <h4 className="reviewTitle">
          {review.reviewTitle}
        </h4>
        <span className={review.reviewBodyClass || props.reviewBodyClass}>
          {review.review}
        </span>
        <button className={review.readMoreDisplay || props.readMoreDisplay} onClick={() => {props.readMore(i)}}>Read More &#9662;</button>
        <button className={review.hideMeDisplay || props.hideMeDisplay} onClick={() => {props.hideMe(i)}}>Hide Me &#9652;</button>
        <div className="foundHelpful">
          {review.foundHelpful} found this helpful
        </div>
      <div className="greyLine"></div>
      </div>
    </div>
);
  return (
    <div className="reviewBody">{reviewItems}</div>
  );
}

export default reviewBody