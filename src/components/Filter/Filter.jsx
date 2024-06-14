import React from "react";
import css from "./Filter.module.scss";
import PropTypes from "prop-types";

const Filter = ({ changeHandler }) => {
  return (
    <div className={css["container"]}>
      <span>Find contacts by name</span>
      <input
        type="text"
        name="filter"
        onChange={changeHandler}
        className={css["filter-input"]}
      />
    </div>
  );
};

Filter.propTypes = {
  changeHandler: PropTypes.func.isRequired,
};

export default Filter;
