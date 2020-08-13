import { spawn } from "redux-saga/effects"

// Sagas
import role from "./role-saga"

export default function* rootSaga() {
  yield spawn(role)
}
