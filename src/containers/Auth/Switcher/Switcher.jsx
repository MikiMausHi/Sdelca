import React from "react";
import classes from "./Switcher.module.scss";

const Switcher = ({ mode, onClick }) => {
  const authСls = [classes.Item];
  const regСls = [classes.Item];
  let authClickHandler = null;
  let regClickHandler = null;

  if (mode === "auth") {
    regСls.push(classes.Active);
    regClickHandler = onClick;
  } else {
    authСls.push(classes.Active);
    authClickHandler = onClick;
  }

  return (
    <div className={classes.Switcher}>
      <div
        className={authСls.join(" ")}
        onClick={authClickHandler}
        style={{ borderTopLeftRadius: "22px" }}
      >
        <span>Авторизация</span>
      </div>
      <div
        className={regСls.join(" ")}
        onClick={regClickHandler}
        style={{ borderTopRightRadius: "22px" }}
      >
        <span>Регистрация</span>
      </div>
    </div>
  );
};

export default Switcher;
