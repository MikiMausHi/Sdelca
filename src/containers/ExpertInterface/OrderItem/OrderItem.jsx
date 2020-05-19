import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import { withRouter, useParams } from "react-router-dom";

const OrderItem = ({ order, soon = "", history, hours }) => {
  const { listType } = useParams();
  const cls = ["order"];
  if (soon !== "") {
    cls.push("fire");
  }

  const openOrder = (id) => {
    if (listType === "search" || listType === "all") {
      history.push({
        pathname: `/accept-order/${id}`,
      });
    } else {
      history.push({
        pathname: `/execute-order/${id}`,
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
          {soon === "fire" && (
            <span
              title="Горящая сделка - для совершения сделки осталось менее двух часов.
          Оплата по повышенному коэффициенту."
            >
              <FaFireAlt color="#FC0D1C" />
            </span>
          )}
          {soon === "urgent" && (
            <span title="Внимание! До завершения сделки осталось мало времени. Поторопитесь!">
              <IoMdAlert color="#FC0D1C" />
            </span>
          )}
          &nbsp; {order.price}руб. <FaRegClock color="#dadada" />
        </p>
        <span className="order-estimate">осталось часов: {hours}</span>
      </div>
    </div>
  );
};

export default withRouter(OrderItem);
