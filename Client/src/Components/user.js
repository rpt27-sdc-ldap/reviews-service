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
      <amp-img src={props.review.urlString} alt="Profile Picture" className="profilePicture user" />
      <div className="nameAndDate">
        <div className="userName">{props.review.reviewerName}</div>
        <div className="date">{dateString}</div>
      </div>
    </div>
  )
};

export default User;