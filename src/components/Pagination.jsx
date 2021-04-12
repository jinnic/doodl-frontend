import React from "react";

const Pagination = props => {
    const { handleChangePage, page, totalPages } = props;
    return (
        <div className="pagination-container">
            <button className={"pg-button pg-left " + (page === 1 ? "disabled" : "")} onClick={() => handleChangePage(-1)}>➜</button>
            <button className={"pg-button " + (page === totalPages ? "disabled" : "")} onClick={() => handleChangePage(+1)}>➜</button>
        </div>
      );
}
export default Pagination