import React from "react";
import propTypes from "prop-types/";
import "../App.css";

export default function Select({ options, className, ...rest }) {
  const convertDateToNum = (date) => new Date(date).getTime();

  const sorting = (a, b) => {
    return convertDateToNum(b.created) - convertDateToNum(a.created);
  };

  return (
    <select className={`select ${className ? className : ""}`} {...rest}>
      {rest.placeholder && <option>{rest.placeholder}</option>}
      {options &&
        options.sort(sorting).map((option, index) => (
          <option value={option.episode_id} key={index + option.title}>
            {option.title}
          </option>
        ))}
    </select>
  );
}

Select.prototype.options = propTypes.array;
