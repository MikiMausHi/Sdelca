import React, { useState } from "react";
import classes from "./Auth.module.scss";
import Login from "./Login/Login";
import Register from "./Register/Register";

const Auth = ({ closeClick }) => {
  const [mode, setMode] = useState("auth");

  const switchFormHandler = () => {
    mode === "auth" ? setMode("reg") : setMode("auth");
  };

  return (
    <div className={classes.Auth}>
      <div className={classes.wrapper}>
        <div className={classes.wnd}>
          <span className={classes.closebtn} onClick={closeClick}>
            &times;
          </span>
          {mode === "auth" ? (
            <Login switchMode={switchFormHandler} mode={mode} />
          ) : (
            <Register switchMode={switchFormHandler} mode={mode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
