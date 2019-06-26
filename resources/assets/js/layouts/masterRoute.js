import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const MasterRoute = (props) => {
  const { adminUser, authUser, component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={props =>
        adminUser == authUser ?
          <Component {...props} />
          : <Redirect to="/" />
      }
    />
  )
}

export default MasterRoute;
