import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./rootreducer";

export function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, applyMiddleware(logger));
  return store;
}

export const store = configureStore();
