import React, { useState, useEffect, useRef, useCallback } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  GET_ROLES_REQUESTED,
  CLEAR_ROLES_REQUESTED
} from "../redux/actions/role-actions"

function Role({ role: { roles, loading }, getRoles, clearRoles }) {
  const [page, setPage] = useState(1)

  // Check if the user reaching the last element of the data
  const observer = useRef()
  const lastElement = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && roles) {
          setPage((prevNumber) => prevNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, roles]
  )

  useEffect(() => {
    getRoles(page)

    // eslint-disable-next-line
  }, [page])

  return (
    <div>
      {roles &&
        roles.map((role) => (
          <p ref={lastElement} key={role.ID}>
            {role.Name}
          </p>
        ))}
      {loading && "Loading..."}
    </div>
  )
}

Role.propTypes = {
  roles: PropTypes.array,
  getRoles: PropTypes.func.isRequired,
  clearRoles: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    role: state.role
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRoles: (page) => dispatch({ type: GET_ROLES_REQUESTED, payload: page }),
    clearRoles: () => dispatch({ type: CLEAR_ROLES_REQUESTED })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)
