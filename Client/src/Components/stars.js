import React from "react";

function stars(props) {
  const starObject = {
    '1': '\u2605\u2606\u2606\u2606\u2606',
    '2': '\u2605\u2605\u2606\u2606\u2606',
    '3': '\u2605\u2605\u2605\u2606\u2606',
    '4': '\u2605\u2605\u2605\u2605\u2606',
    '5': '\u2605\u2605\u2605\u2605\u2605'
  }

  const Stars = props.reviews.map((review, i) =>
    <div key={i}>
      <div>
      <span>Overall</span>
      <span className="Stars">{starObject[review.overallStars]}</span>
      </div>
      <div>
        <span>Performance</span>
        <span className="Stars">{starObject[review.performanceStars]}</span>
      </div>
      <div>
        <span>Story</span>
        <span className="Stars">{starObject[review.storyStars]}</span>
      </div>
    </div>
  );
  return (
    <div>{Stars}</div>
  );
}

export default stars;