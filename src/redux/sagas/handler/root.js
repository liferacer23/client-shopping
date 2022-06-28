import { call, put } from "redux-saga/effects";
import { setItems } from "../../ducks/Items";
import {requestGetItems } from "../request/ItemsR";

export function* handleGetItems() {
  try {
    const response = yield call(requestGetItems);
    const { data } = response;
    yield put(setItems(data));
  } catch (err) {
    console.log(err);
  }
}

