import React from "react";

const Search = props => {
  return (
    <div className="">
      <div className="">
        <input className="" onChange={props.getSearchTerm} />
        <i className="" />
      </div>
    </div>
  )
}
export default Search