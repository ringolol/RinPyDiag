import { AppStateType } from "./store";

export const getIsAuth = (state: AppStateType) => state.auth.isAuth;
export const getUsername = (state: AppStateType) => state.auth.username;
export const getIsRegistered = (state: AppStateType) => state.auth.isRegistered;
export const getIsFetching = (state: AppStateType) => state.auth.isFetching;