import { downloadContent } from './diagram_reducer';
import { authAPI } from "../api/api";

const SET_AUTH = 'auth/SET_AUTH';
const SET_TOKEN = 'auth/SET_TOKEN';
const SET_USERNAME = 'auth/SET_USERNAME';

let initialState = {
    isAuth: false as boolean,
    token: null as null | string,
    isFetching: true as boolean,
    username: null as string | null
};
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        case SET_TOKEN: {
            return {
                ...state,
                token: action.token
            }
        }
        case SET_USERNAME: {
            return {
                ...state,
                username: action.username,
            }
        }
        default:
            return state;
    }  
}

type SetAuthActionType = {
    type: typeof SET_AUTH
    isAuth: boolean
}
export const setAuth = (isAuth: boolean): SetAuthActionType => ({ type: SET_AUTH, isAuth });
type SetTokenActionType = {
    type: typeof SET_TOKEN
    token: string | null
}
export const setToken = (token: string | null): SetTokenActionType => ({ type: SET_TOKEN, token });
export type SetUsernameActionType = {
    type: typeof SET_USERNAME
    username: string | null
}
export const setUsername = (username: string | null): SetUsernameActionType => ({ type: SET_USERNAME, username });


export const getAutoAuth = () => (dispatch: any) => {
    const [token, username] = authAPI.authMe();
    if (token) {
        dispatch(setAuth(true));
        dispatch(setUsername(username));
        dispatch(setToken(token));
        dispatch(downloadContent(token));
    }
}

export const onLogIn = (username: string, password: string) =>  (dispatch: any) => {
    authAPI.login(username, password).then((response: any) => {
        response && response.status === 200
        ? dispatch(getAutoAuth())
        : console.log(response);
    })
}

export const onLogOut = () => (dispatch: any) => {
    authAPI.logout();
    dispatch(setToken(null));
    dispatch(setUsername(null));
    dispatch(setAuth(false));
}


export default authReducer;