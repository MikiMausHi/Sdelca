import React, {useState} from "react";
import {FaAngleDown} from "react-icons/fa";
import classes from "./WantedTimeSelector.module.scss";
import {categories} from "./categories";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from "react-day-picker/moment";
import "moment/locale/ru";
import moment from "moment";

const WantedTimeSelector = ({value, onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPickerWanted, setshowPickerWanted] = useState(false);

  const setSelectedDate = val => {
    setshowPickerWanted(!showPickerWanted);
    const searchDate = [moment(val).day(), moment(val).month()+1, moment(val).year()];
    const today = moment();
    const todayDate = [today.day(), today.month()+1, today.year()];
    
    if ((searchDate[2] > todayDate[2]) || 
      ((searchDate[2] === todayDate[2]) && (searchDate[1] > todayDate[1])) ||
      ((searchDate[2] === todayDate[2]) && (searchDate[1] === todayDate[1]) && (searchDate[0] >= todayDate[0]))) {

        const e = {target: {value: `${moment(val).format('dddd, D MMMM YYYY')}`}}
        onChange(e)
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChoose = cat => {

    if (!cat.date) {
      setIsOpen(!isOpen);
      setshowPickerWanted(!showPickerWanted);
    } else {
      onChange({target: {value: cat.date}});

      setIsOpen(!isOpen);
    }

  };

  const renderList = () => {
    
    const tmp = categories.map((cat, index) => {
      const title = cat.title.replace(cat.title[0], cat.title[0].toUpperCase());
      return (
        <li key={index} onClick={(event) => handleChoose(cat)}>
          {title}
          {!cat.date && (
            <span>
              49р.
            </span>
          )}
        </li>
      );
    });
    return [
      ...tmp
    ];
  };

  const setTitle = () => {
    let title = 'Сегодня';
    if (value === moment().format('dddd, D MMMM YYYY')) {
      title = 'Сегодня';
    } else if (categories.some(cat => cat.date === value)) {
      categories.forEach(cat => {
        if (value === cat.date) {
          title = cat.title.replace(cat.title[0], cat.title[0].toUpperCase());
        }
      })
    } else {
      title = moment(value, 'dddd, D MMMM YYYY').format('D MMMM')
    }
    return title
  }

  return (
    <div className={classes.WantedTimeSelector}>
      <div className={classes.select}>
        <div onClick={handleToggle}>
          {setTitle()}
          <span>
            <FaAngleDown size={12}/>
          </span>
        </div>
        {isOpen &&
          <div className={classes.list}>
            <ul>{renderList()}</ul>
          </div>
        }
      </div>
      {showPickerWanted &&
        <div className="day_picker_wanted">
          <DayPicker
            locale="ru"
            localeUtils={MomentLocaleUtils}
            value={moment(value, 'dddd, D MMMM YYYY').format('D MMMM')}
            onDayClick={setSelectedDate}
            modifiers={{disabled: {before: new Date()}}}
            className="DayPicker_myClass2"
          />
        </div>
      }
    </div>
  );
}

export default WantedTimeSelector;
