import React from 'react';

const SortBy = (props) => {


  return (
    <div className="sortByDiv">
      <label htmlFor="sortBy" id="sortByLabel">Sort by:</label>
      <select name="sortBy" id="sortBy" onChange={(e) => {props.sortReviews(e)}}>
        <option value="mostHelpful">Most Helpful</option>
        <option value="mostRecent">Most Recent</option>
      </select>
    </div>
  )
}


export default SortBy;