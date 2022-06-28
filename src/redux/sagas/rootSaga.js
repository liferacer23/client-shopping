import { takeLatest } from "redux-saga/effects";
import { handleGetItems } from "./handler/root";
import { GET_ITEMS } from "../ducks/Items";


export function* watcherSaga() {
  yield takeLatest(GET_ITEMS, handleGetItems);
}
