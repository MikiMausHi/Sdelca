import React from "react";
import OrderList from "./OrdersList/OrderList";
import { useParams } from "react-router-dom";

const ClientInterface = () => {
  const { listType } = useParams();
  return (
    <div className="wrapper">
      <OrderList type={listType} />
    </div>
  );
};

export default ClientInterface;
