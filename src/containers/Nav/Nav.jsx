import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Nav.module.scss";

const Nav = () => {
  const [setShowAuth] = useState(false);

  const modalOutClickHandler = () => {
    setShowAuth(false);
  };

  return (
    <div className={classes.Nav}>
      <ul>
        <li>
          <Link to="/client/newDeals" className={classes.link}>
            Интерфейс клиента
          </Link>
        </li>
        <li>
          <Link to="/expert/search" className={classes.link}>
            Интерфейс эксперта
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
