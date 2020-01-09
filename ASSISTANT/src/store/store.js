import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from "redux";
import freeze from "redux-freeze";
import { reducers } from "../reducers/index";

let middlewares = [];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(freeze);
}

let middleware = applyMiddleware(...middlewares, thunk);

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware = compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducers, middleware);

export { store }