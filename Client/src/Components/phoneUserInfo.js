import React from 'react';
import moment from 'moment';

const phoneUserInfo = (props) => {
  const date = moment(props.review.date).format();
  const index = date.indexOf('T');
  const slicedDate = date.slice(0, index);
  const dateArray = slicedDate.split('-');
  const dateString = dateArray[1] + '-' + dateArray[2] + '-' + dateArray[0];
  return (
    <div className="phoneUserInfo">
      <div className="By">By</div>
      <div className="phoneUserName">{props.review.reviewerName}</div>
      <time className="phoneOnDate">on {dateString}</time>
    </div>
  )
};

export default phoneUserInfo;