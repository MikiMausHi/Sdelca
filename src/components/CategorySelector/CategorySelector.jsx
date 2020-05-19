import React, {useState} from "react";
import {FaAngleDown} from "react-icons/fa";
import {FaAngleRight} from "react-icons/fa";
import classes from "./CategorySelector.module.scss";
import {categories} from "./categories";

const CategorySelector = ({value, onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [value, setValue] = useState("Категория");
  const [list, setList] = useState(categories);
  const [listLevel, setListLevel] = useState(0);
  const [backList, setBackList] = useState([]);
  const [cls, setCls] = useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChoose = cat => {
    if (cat.sub) {
      setBackList(list);
      setList(cat.sub);
      setListLevel(listLevel + 1);
      setCls(classes.animateForward);
      //ждем пока тработает анимация и затем убираем класс с анимацией
      setTimeout(() => {
        setCls("");
      }, 600);
    } else {

      onChange({target: {value: cat.title}});

      setIsOpen(!isOpen);
    }
  };

  const handleBack = () => {
    const newLevel = listLevel - 1;
    setListLevel(newLevel);
    setCls(classes.animateBackward);
    setTimeout(() => {
      setCls("");
    }, 600);
    if (newLevel > 0) {
      setList(backList);
    } else {
      setList(categories);
    }
    onChange({target: {value: "Категория"}});
  };

  const renderList = () => {
    const selectList = [];
    if (listLevel > 0) {
      selectList.push(
        <li key="back" className={classes.back} onClick={handleBack}>
          Назад
        </li>
      );
    }

    const tmp = list.map((cat, index) => {
      return (
        <li key={index} onClick={() => handleChoose(cat)}>
          {cat.title}
          {cat.sub && (
            <span>
              <FaAngleRight size={12}/>
            </span>
          )}
        </li>
      );
    });
    return [...selectList, ...tmp];
  };


  return (
    <div className={classes.CategorySelector}>
      <div className={value&&value!=='Категория' ? classes.select : `${classes.select} ${classes.unselect}`}>
        <div onClick={handleToggle}>
          {value?value:'Категория'}
          <span>
            <FaAngleDown size={12}/>
          </span>
        </div>
        {isOpen && (
          <div className={classes.list}>
            <ul className={cls}>{renderList()}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
