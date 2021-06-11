import React from 'react';
import moment from 'moment';

const User = (props) => {
  const date = moment(props.review.date).format();
  const index = date.indexOf('T');
  const slicedDate = date.slice(0, index);
  const dateArray = slicedDate.split('-');
  const dateString = dateArray[1] + '-' + dateArray[2] + '-' + dateArray[0];
  return (
    <div className="userInfo">
      <img src={props.review.urlString} alt="Profile Picture" className="profilePicture user" height="40px" width="40px"/>
      <div className="nameAndDate">
        <div className="userName">{props.review.reviewerName}</div>
        <time className="date">{dateString}</time>
      </div>
    </div>
  )
};

export default User;