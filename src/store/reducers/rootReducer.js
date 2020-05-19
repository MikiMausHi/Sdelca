import {combineReducers} from 'redux'
import orderReducer from "./order";
import authReducer from "./auth";

export default combineReducers({
  orders: orderReducer,
  auth: authReducer
})
