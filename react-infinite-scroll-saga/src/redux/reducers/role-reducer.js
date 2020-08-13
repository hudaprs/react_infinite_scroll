import { GET_ROLES, SET_LOADING, CLEAR_ROLES } from "../actions/role-actions"

const initialState = {
  loading: false,
  roles: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_ROLES:
      return {
        ...state,
        roles: [...new Set([...state.roles, ...payload.Data.Results])],
        loading: false
      }
    case CLEAR_ROLES:
      return {
        ...state,
        roles: []
      }
    default:
      return state
  }
}
