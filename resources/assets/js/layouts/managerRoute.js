import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ManagerRoute = (props) => {
  const { adminUser, authUser, role, component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={props =>
        (adminUser == authUser) || (role == "Manager") ?
          <Component {...props} />
          : <Redirect to="/" />
      }
    />
  )
}

export default ManagerRoute;
