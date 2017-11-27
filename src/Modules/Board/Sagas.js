import axios from "axios";
import { COLUMN_ADD } from "./Actions";
import { all, call, put, takeEvery } from "redux-saga/effects";

//Workers
function* addColumn() {
  console.log("hej");
  yield ["hej"];
}

// Watchers
function* testSaga() {
  yield takeEvery(COLUMN_ADD, addColumn);
}

//Root
export default function* boardSaga() {
  const [] = yield all([call(testSaga)]);
}
