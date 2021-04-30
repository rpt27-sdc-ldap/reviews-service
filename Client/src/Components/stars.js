import React from "react";

function stars(props) {
  const fiveStars = ★★★★★
  const fourStars = ★★★★☆
  const threeStars = ★★★☆☆
  const twoStars = ★★☆☆☆
  const oneStar = ★☆☆☆☆

  const stars = props.reviews.map((review, i) =>
    <div key={i}>
      <div>
      <span>Overall</span>
      <span className="Stars"></span>
      </div>
      <div>
        <span>Performance</span>
        <span className="Stars"></span>
      </div>
      <div></div>
        <span>Story</span>
        <span className="Stars"></span>
      </div>
    </div>
  );
  return (
    <div>{stars}</div>
  );
}

export default stars