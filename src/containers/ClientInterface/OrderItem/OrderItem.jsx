import React from "react";
import {FaFireAlt} from "react-icons/fa";
import {FaRegClock} from "react-icons/fa";
import {IoMdAlert} from "react-icons/io";
import {withRouter, useParams} from "react-router-dom";

const OrderItem = ({order, soon = "", history, hours}) => {
  const {listType} = useParams();
  const cls = ["order"];
  if (soon !== "") {
    cls.push("fire");
  }

  const openOrder = id => {
    if (listType === "inProcess") {
      history.push({
        pathname: `/confirm/${id}`
      });
    }
  };
  return (
    <div className={cls.join(" ")} onClick={() => openOrder(order.id)}>
      <div className="order-body">
        <div className="order-time">
          <span>{order.time}</span>
        </div>
        <div className="order-info">
          <p className="order-info-name">{order.title}</p>
          <div className="order-info-tag">
            <p className="tag">{order.category}</p>
            <p className="tag">{order.service}</p>
          </div>
        </div>
      </div>
      <div className="order-tail">

        <p className="order-price">
          {soon === "fire" &&
          <FaFireAlt color="#FC0D1C"/>}
          {soon === "urgent" &&
          <IoMdAlert color="#FC0D1C"/>}
          &nbsp; {order.amountTotal}руб. <FaRegClock color="#dadada"/>
        </p>
        <span className="order-estimate">осталось часов: {hours}</span>
      </div>
    </div>
  );
};

export default withRouter(OrderItem);
