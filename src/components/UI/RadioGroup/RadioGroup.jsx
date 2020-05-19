import React from "react";
import classes from "./RadioGroup.module.scss";

const RadioGroup = ({ options, defaultValue = "", onChange }) => {
  const renderRadioButtons = () => {
    return options.map((opt, index) => {
      const id = Math.random();
      const checked = defaultValue === opt.value;
      return (
        <React.Fragment key={index}>
          <input
            type="radio"
            name={opt.name}
            value={opt.value}
            onChange={onChange}
            checked={checked}
            id={id}
            className={classes.RadioGroup}
          />
          <label htmlFor={id} className={classes.RadioGroup}>
            {opt.label}
          </label>
        </React.Fragment>
      );
    });
  };
  return <React.Fragment>{renderRadioButtons()}</React.Fragment>;
};

export default RadioGroup;
