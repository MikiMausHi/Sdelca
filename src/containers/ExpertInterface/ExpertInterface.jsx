import React from "react";
import "./ExpertInterface.scss";
import OrderList from "./OrdersList/OrderList";
import { useParams } from "react-router-dom";

const ExpertInterface = () => {
  const { listType } = useParams();
  return (
    <div className="ExpertInterface">
      <OrderList type={listType} />
    </div>
  );
};

export default ExpertInterface;
