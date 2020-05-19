import React from "react";
import classes from "./Select.module.css";

const Select = ({ options, value, onChange }) => {
  const renderOptions = () => {
    return options.map((option, index) => {
      return (
        <option
          key={index}
          value={option.value}
        >
          {option.title}
        </option>
      );
    });
  };
  return (
    <select className={classes.Select} onChange={onChange} value={value}>
      {renderOptions()}
    </select>
  );
};

export default Select;
