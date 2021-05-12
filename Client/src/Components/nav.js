import React from 'react';

const nav = (props) => {

  return (
  <nav>
    <div className={"formattingDiv"}></div>
    <div className={"greyBar"}></div>
    <button className={props.state.Canada} onClick={() => {props.setCanadaClass()}}>Audible.co.ca Reviews</button>
    <button className={props.state.Audible} onClick={() => {props.setAudibleClass()}}>Audible.com Reviews</button>
    <div className="customerReviewsDiv">
      Customer Reviews
    </div>
  </nav>
  )
}


export default nav;