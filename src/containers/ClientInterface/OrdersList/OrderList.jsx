import React, {useState, useEffect} from "react";
import "./OrderList.scss";
import Button from "../../../components/UI/Button/Button";
import OrdersBlock from "../OrdersBlock/OrdersBlock";
import {getOrders} from "../../../store/actions/order";
import {connect} from 'react-redux'
import {NavLink, withRouter} from "react-router-dom";
// import axios from 'axios';


const OrderList = ({type, history, orders, getOrders, token}) => {
  // const tok = localStorage.getItem('token-expert') || token;
  // console.log(axios.defaults.headers.common);
  // getOrders(tok)
  //     .then((data) => {
  //       console.log(data)
  //     })
  //     .catch(error => console.log('ordersErros: ', error))
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
      case "newDeals":
        const newOrders = orders.filter(order => order.orderStatus==='new')
        setDataList([ {date: new Date(), orders: newOrders}]);
        break;
      case "inProcess":
        const workOrders = orders.filter(order => order.orderStatus==='inProcess')
        setDataList([ {date: new Date(), orders: workOrders}]);
        break;
      case "completed":
        const doneOrders = orders.filter(order => order.orderStatus==='completed')
        setDataList([ {date: new Date(), orders: doneOrders}]);
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
          <NavLink to="/client/newDeals">Новые заказы</NavLink>
        </li>
        <li>
          <NavLink to="/client/inProcess">На исполнении</NavLink>
        </li>
        <li>
          <NavLink to="/client/completed">Завершенные</NavLink>
        </li>
      </ul>

      {type === 'newDeals' && <Button onClick={() => history.push('/newDeal')} type='primary'>Новая заявка</Button>}


      {renderBlocks()}


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
      <Button onClick={() => history.push('/expert/search')} type='primary'>Эксперт</Button>
    </div>
  );
};

export default connect(state => ({orders: state.orders.orders, token: state.auth.token}), {getOrders})(withRouter(OrderList));
