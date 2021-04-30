import React from 'react';
import moment from 'moment';

const User = (props) => {
  const date = moment(props.review.date).format();
  const index = date.indexOf('T');
  const slicedDate = date.slice(0, index);
  const dateArray = slicedDate.split('-');
  const dateString = dateArray[1] + '-' + dateArray[2] + '-' + dateArray[0];
  return (
    <div>
      <img src={props.review.urlString} alt="Profile Picture" className="profilePicture user" />
      <span className="user">{props.review.reviewerName}</span>
      <span className="date">{dateString}</span>
    </div>
  )
};

export default User;