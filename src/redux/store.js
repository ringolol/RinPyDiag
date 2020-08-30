import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import blocksReducer from "./blocks_reducer";

let reducersPack = combineReducers({
    blocksPage: blocksReducer,
});


const store = createStore(reducersPack, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;