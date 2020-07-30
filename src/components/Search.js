import React from "react";

const Search = props => {
  return (
    <div id="search-bar-container">
        <label>search doodles:</label>
        <input id="search-bar" onChange={props.getSearchTerm} />
    </div>
  )
}
export default Search