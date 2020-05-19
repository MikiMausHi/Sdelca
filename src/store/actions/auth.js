import {LOGIN} from "./actionTypes";
import axios from "axios";
import config from '../../config/prod';

export const handleAuthData = data => {
  localStorage.setItem('token-expert', data.access_token);
  localStorage.setItem('role-expert', data.role);

  return {
    type: LOGIN,
    data
  }
}

export const userSignUpRequest = (userData) => {
  return dispatch => {
    return axios.post(`${config.apiBaseUrl}/login`, userData)
  }
}
