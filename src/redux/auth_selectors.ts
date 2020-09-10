import { AppStateType } from "./store";

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const getToken = (state: AppStateType) => {
    return state.auth.token;
}

export const getUsername = (state: AppStateType) => {
    return state.auth.username;
}