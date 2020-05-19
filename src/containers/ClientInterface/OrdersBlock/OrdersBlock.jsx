import React from "react";
import { calcDiffHours } from "../../../utils/utils";
import OrderItem from "../OrderItem/OrderItem";
import moment from "moment";

const OrdersBlock = ({ list }) => {
  const renderItems = () => {
    return list.orders.map((order, index) => {
      const hours = calcDiffHours(order.dealDate);
      // console.log('dealDate', order.dealDate)
      const orderStatus =
        hours < 3 && hours > 0
          ? "fire"
          : hours < 24 && hours > 0
          ? "urgent"
          : "";

      return (
        <React.Fragment key={index}>
          <OrderItem order={order} soon={orderStatus} hours={hours} />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="orders">
      <div className="date">{moment(list.date).format("DD.MM.YYYY")}</div>
      {renderItems()}
    </div>
  );
};

export default OrdersBlock;
