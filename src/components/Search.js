import React from "react";

const Search = props => {
  return (
    // <div id="search-bar-container">
    <>
        <input id="search-bar" onChange={props.getSearchTerm} placeholder="search doodles here"/>
    </>
    // </div>
  )
}
export default Search