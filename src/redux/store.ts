import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import blocksReducer from "./blocks_reducer";
import authReducer from "./auth_reducer";

let rootReducer = combineReducers({
    blocksPage: blocksReducer,
    auth: authReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store; // Bringing the store to the global variable

export default store;