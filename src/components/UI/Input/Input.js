import React from "react";
import classes from "./Input.module.scss";

const isInvalid = (valid, touched, shouldValidate) => {
  return !valid && touched && shouldValidate;
};

const Input = ({
  label,
  type,
  value,
  onChange,
  errorMessage,
  valid,
  touched,
  shouldValidate,
  placeholder
}) => {
  const inputType = type || "text";
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(valid, touched, shouldValidate)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{label}</label>
      <input type={inputType} id={htmlFor} value={value} onChange={onChange} placeholder={placeholder} />
      {isInvalid(valid, touched, shouldValidate) && (
        <span>{errorMessage || "Введите верное значение"}</span>
      )}
    </div>
  );
};

export default Input;
