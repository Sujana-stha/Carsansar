import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
        localStorage['access_token'] ? 
        <Component {...props} />
        : <Redirect to="/auth/login"/>
        }
      />
    )
  }
}




export default (PrivateRoute);
