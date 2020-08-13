import { call, put, takeEvery } from "redux-saga/effects"

// Actions
import {
  GET_ROLES,
  GET_ROLES_REQUESTED,
  SET_LOADING,
  CLEAR_ROLES,
  CLEAR_ROLES_REQUESTED
} from "../actions/role-actions"

// API's
import { getAllRoles } from "../api/role-api"

function* getRoles({ payload }) {
  yield put({ type: SET_LOADING })

  const roles = yield call(getAllRoles, payload)

  yield put({ type: GET_ROLES, payload: roles })
}

function* clearRoles() {
  yield put({ type: CLEAR_ROLES })
}

export default function* roleSaga() {
  yield takeEvery(GET_ROLES_REQUESTED, getRoles)
  yield takeEvery(CLEAR_ROLES_REQUESTED, clearRoles)
}
