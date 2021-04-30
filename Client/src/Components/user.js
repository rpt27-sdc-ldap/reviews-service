import React from 'react';
import moment from 'moment';

const User = (props) => {
  console.log(props.review);
  return (
    <div>
      <img src={props.review.urlString} alt="Profile Picture" className="profilePicture user" />
      <span className="user">{props.review.reviewerName}</span>
      <span className="date">{props.review.date}</span>
    </div>
  )
};

export default User;