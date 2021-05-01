import React from "react";

function stars(props) {
  const starObject = {
    '1': '\u2605\u2606\u2606\u2606\u2606',
    '2': '\u2605\u2605\u2606\u2606\u2606',
    '3': '\u2605\u2605\u2605\u2606\u2606',
    '4': '\u2605\u2605\u2605\u2605\u2606',
    '5': '\u2605\u2605\u2605\u2605\u2605'
  }

  return (
    <div className="reviewAndStars">
      <div>
      <span className="overallStarsText">Overall &#8202;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span className="Stars overallStars">{starObject[props.review.overallStars]}</span>
      </div>
      <div>
        <span className="performanceStarsText">Performance&#8202;&#8202;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="Stars performanceStars">{starObject[props.review.performanceStars]}</span>
      </div>
      <div>
        <span className="storyStarsText">Story&#8202;&#8202;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="Stars storyStars">{starObject[props.review.storyStars]}</span>
      </div>
    </div>
  );
}

export default stars;