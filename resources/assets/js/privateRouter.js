import React, {Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import { requestLoggedUser } from './actions/users-action'
import store from './store'

class PrivateRoute extends Component {

  // componentWillMount() {
  //   requestLoggedUser();
  // }

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

// const stateToProps = ({ loggedUserState }) => ({
//   pending: loggedUserState.pending,
//   logged: loggedUserState.logged
// })
function mapStateToProps(store) {
  return {
    isAuthenticated: store.loginState.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
