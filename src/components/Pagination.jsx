import React from "react";

const Pagination = props => {
    const { handleChangePage } = props;
    return(
        <div className="">
          <ul className="">
            <button className="" onClick={() => handleChangePage(-1)}>previous</button>
            <button className="" onClick={() => handleChangePage(+1)}>next</button>
          </ul>
        </div>
      );
}
export default Pagination