import {LOGIN} from "../actions/actionTypes";

const initialToken = localStorage.getItem('token-expert'),
    initialRole = localStorage.getItem('role-expert');

const initialState = initialToken ? {
        token: initialToken,
        role: initialRole
    } : {
        token: null,
        role: null
    };


export default function authReducer(state = initialState, action) {
    const {type, data} = action;
    switch (type) {
        case LOGIN:

            return {
                ...state, 
                token: data.access_token, 
                role: data.role
            };

        default:
            return state
    }
}
