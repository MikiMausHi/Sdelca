import {ACCEPT_ORDER, ADD_ORDER, SET_ORDERS} from "./actionTypes";
import axios from "axios";
import config from '../../config/prod';

export const addOrder = order => ({
  type: ADD_ORDER,
  order
})

export const acceptOrder = id => ({
  type: ACCEPT_ORDER,
  id
})

export const setOrders = ordersData => ({
  type: SET_ORDERS,
  ordersData
})

export const getOrders = token => {
  return async dispatch => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await axios.get(`${config.apiBaseUrl}/orders`)
  }
}