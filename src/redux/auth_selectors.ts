import { AppStateType } from "./store";

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const getUsername = (state: AppStateType) => {
    return state.auth.username;
}