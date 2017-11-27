import { call, put, fork } from "redux-saga/effects";
import boardSaga from "./Board/Sagas";

export default function* rootSaga() {
  yield [fork(boardSaga)];
}
