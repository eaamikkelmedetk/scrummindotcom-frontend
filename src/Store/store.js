import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./rootreducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../Modules/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = configureStore();
