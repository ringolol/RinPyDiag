import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import diagramReducer from "./diagram_reducer";
import authReducer from "./auth_reducer";
import appReducer from "./app_reducer";

let rootReducer = combineReducers({
    diagramPage: diagramReducer,
    auth: authReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store; // Bringing the store to the global variable

export default store;