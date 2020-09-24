import { authAPI } from './../api/api';
import { downloadContent } from './diagram_reducer';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './store';

const SET_AUTH = 'auth/SET_AUTH';
const SET_USERNAME = 'auth/SET_USERNAME';
const SET_REGISTER = 'auth/SET_REGISTER';
const TOGGLE_IS_FETCHING = 'auth/TOGGLE_IS_FETCHING';

let initialState = {
    isAuth: false as boolean,
    isRegistered: false as boolean,
    isFetching: true as boolean,
    username: null as string | null
};
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case SET_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        case SET_REGISTER: {
            return {
                ...state,
                isRegistered: action.isRegistered,
            }
        }
        case SET_USERNAME: {
            return {
                ...state,
                username: action.username,
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }
        default:
            return state;
    }  
}

// actions
type ActionsTypes = SetAuthActionType | SetUsernameActionType | SetRegisterActionType | ToggleIsFetchingActionType;
type SetAuthActionType = {
    type: typeof SET_AUTH
    isAuth: boolean
}
export const setAuth = (isAuth: boolean): SetAuthActionType => ({ type: SET_AUTH, isAuth });
export type SetRegisterActionType = {
    type: typeof SET_REGISTER
    isRegistered: boolean
}
export const setRegister = (isRegistered: boolean): SetRegisterActionType => ({ type: SET_REGISTER, isRegistered });
export type SetUsernameActionType = {
    type: typeof SET_USERNAME
    username: string | null
}
export const setUsername = (username: string | null): SetUsernameActionType => ({ type: SET_USERNAME, username });
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

// Thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getAutoAuth = (): ThunkType => async (dispatch) => {
    const response = await authAPI.authMe();
    if (response) {
        dispatch(setAuth(true));
        dispatch(setUsername(response.data.username));
        dispatch(downloadContent());
    }
}

export const onLogIn = (username: string, password: string): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(false));
    const response = await authAPI.login(username, password);
    if (response && response.status === 200) {
        await dispatch(getAutoAuth())
    } else {
        console.log(response);
    }
    dispatch(toggleIsFetching(true));
}

export const onLogOut = (): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(false));
    const response = await authAPI.logout();
    if (response && response.status === 200) {
        dispatch(setUsername(null));
        dispatch(setAuth(false));
    }
    dispatch(toggleIsFetching(true));
}

export const register = (
    username: string, 
    password: string, 
    password_confirm: string,
    first_name?: string,
    last_name?: string,
    email?: string
): ThunkType => async (dispatch) => {
    dispatch(toggleIsFetching(false));
    const response = await authAPI.register(
        username, password, password_confirm, first_name, last_name, email
    )
    if (response && response.status === 201) {
        dispatch(setRegister(true));
    }
    dispatch(toggleIsFetching(true));
}


export default authReducer;