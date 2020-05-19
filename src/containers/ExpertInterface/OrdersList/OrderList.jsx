import React, {useState, useEffect} from "react";
import {FaAngleDown} from "react-icons/fa";
import "./OrderList.scss";
import CheckBox from "../../../components/UI/CheckBox/CheckBox";
import Button from "../../../components/UI/Button/Button";
import OrdersBlock from "../OrdersBlock/OrdersBlock";
import {orderFullList} from "../../../data/data";
import {connect} from 'react-redux'
import {NavLink, withRouter} from "react-router-dom";

const OrderList = ({type, history, orders}) => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    // (async () => {
    //   console.log("start fetch");
    //   let response = await fetch("lists.json");
    //   let data = await response.text();
    //   setDataList(data);
    // })();
    // console.log(orders);
    switch (type) {
      case "search":
        const newOrders = orders.filter(order => order.orderStatus === 'new')
        setDataList([{date: new Date(), orders: newOrders}]);

        break;
      case "active":
        const workOrders = orders.filter(order => order.orderStatus === 'inProcess')
        setDataList([{date: new Date(), orders: workOrders}]);
        break;
      case "all":
        setDataList(orderFullList);
        break;
      case "completed":
        const doneOrders = orders.filter(order => order.orderStatus === 'completed')
        setDataList([{date: new Date(), orders: doneOrders}]);
        break;
      default:
    }
  }, [type, orders]);

  const renderBlocks = () => {
    return dataList.map((dayList, index) => {
      return (
        <React.Fragment key={index}>
          <OrdersBlock list={dayList}/>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="OrderList">
      <ul className="nav">
        <li>
          <NavLink to="/expert/search">Поиск сделки</NavLink>
        </li>
        <li>
          <NavLink to="/expert/all">Все сделки</NavLink>
        </li>
        <li>
          <NavLink to="/expert/active">Активные</NavLink>
        </li>
        <li>
          <NavLink to="/expert/completed">Завершенные</NavLink>
        </li>
      </ul>

      <h2 className="header">Выберите сделку</h2>
      <div className="filters">
        <div className="filter">
          Город <FaAngleDown color="#333333" size="16px"/>
        </div>
        <div className="filter">
          Категория <FaAngleDown color="#333333" size="16px"/>
        </div>
        <div className="filter">
          Услуги <FaAngleDown color="#333333" size="16px"/>
        </div>
      </div>

      {renderBlocks()}
      <div className="receiveAlerts">
        <CheckBox
          type="expert"
          onChange={() => {
          }}
          checked={true}
          label="Получать уведомления за 1руб./сутки"
        />
        <Button type="primary">Подписаться</Button>
      </div>

      <div className="pagination">
        <button className="pagination-btn currentPage">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <div className="dots">...</div>
        <button className="pagination-btn">4</button>
      </div>

      <br/>
      <br/>
      <hr/>
      <br/>
      <Button onClick={() => history.push('/client/newDeals')} type='primary'>Клиент</Button>

    </div>
  );
};

export default connect(state => ({orders: state.orders.orders}))(withRouter(OrderList));
