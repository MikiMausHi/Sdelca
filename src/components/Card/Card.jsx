import React from "react";
import CheckBox from "../UI/CheckBox/CheckBox";

const Card = ({
  exId,
  photo,
  title,
  specialisation,
  rating,
  handleExecutorIdChange,
  selected
}) => {
  const onChange = val => {
    if (val) {
      val = 0;
    } else {
      val = exId;
    }
    handleExecutorIdChange(val);
  };

  return (
    <div className="card" onClick={() => onChange(selected)}>
      <div className="card-group">
        <img className="card-photo" src={photo} alt="Костик" />
        <div className="card-info">
          <div className="card-info-title">{title}</div>
          <div className="card-info-details">
            специализация {specialisation}
          </div>
          <div className="card-info-details">рейтинг {rating}</div>
        </div>
      </div>
      <CheckBox checked={selected} onChange={() => {}} />
    </div>
  );
};

export default Card;
