import React from 'react';

const SortBy = (props) => {


  return (
    <div className="sortBy">
      <label htmlFor="sortBy">Sort by:</label>
      <select name="sortBy" id="sortBy">
        <option value="mostHelpful">Most Helpful</option>
        <option value="mostRecent">Most Recent</option>
      </select>
    </div>
  )
}


export default SortBy;