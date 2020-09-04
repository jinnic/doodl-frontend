import React from "react";

const Search = props => {
  return (
    <>
        <input id="search-bar" onChange={props.getSearchTerm} placeholder="search doodles here"/>
    </>
  )
}
export default Search