import React from "react";
import PropTypes from "prop-types";
import classes from "./CheckBox.module.scss";

const CheckBox = ({checked, onChange, label, type, leftLabel}) => {
  const id = Math.random();
  const cls = [];
  if (type === "auth") {
    cls.push(classes.checkboxAuthLabel);
  } else if (type === "expert") {
    cls.push(classes.checkboxExpertLabel);
  } else {
    cls.push(classes.checkboxLabel);
  }

  if (leftLabel) {
    cls.push(classes.leftLabel);
  }

  return (
    <div className={classes.checkbox}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={classes.checkboxInput}
      />
      <label htmlFor={id} className={cls.join(" ")}>
        {label}
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  caption: PropTypes.string
};

export default CheckBox;
