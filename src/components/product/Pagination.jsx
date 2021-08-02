import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);
  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
    //eslint-disable-next-line
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
    document.getElementById("products").scrollIntoView();
  };
  return (
    <div className="pagination-container">
      <button
        className="pagination-arrow"
        onClick={() => onButtonClick("prev")}
      >
        <ArrowBackIosIcon fontSize="large" />
      </button>
      <button
        className="pagination-arrow"
        onClick={() => onButtonClick("next")}
      >
        <ArrowForwardIosIcon fontSize="large" />
      </button>
    </div>
  );
};

export default Pagination;
