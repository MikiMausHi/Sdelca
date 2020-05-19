import {ACCEPT_ORDER, ADD_ORDER, SET_ORDERS} from "../actions/actionTypes";

export default function orderReducer(state = {orders: []}, action) {
  const {orders} = state;
  const { type, order, id, ordersData } = action;
  switch (type) {
    case ADD_ORDER:
      {let newOrders = orders;
      newOrders = newOrders.concat(order);
      
      return {
        ...state, 
        orders: newOrders
      }}
    case ACCEPT_ORDER:
      {let newOrders = orders;
      newOrders = newOrders.map(order=>{
        if(order.id === id){
          order.orderStatus = 'inProcess'
        }
        return order
      });
      return {
        ...state,
        orders: newOrders
      }}
    case SET_ORDERS:
      {return {
        ...state, 
        orders: ordersData
      }}
    default:
      return state
  }
}
