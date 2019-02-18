// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import {fakeAuth}  from './helpers/check-auth';


// export const PrivateRoute =({ component: Component, ...rest }) => {
//     console.log('res', rest)
//     return 
//     <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
//   )
// } 

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import { getLoggedUser } from './helpers/check-auth'
import store from './store'

class PrivateRoute extends React.Component {

  // componentWillReceiveProps() {
  //   // getLoggedUser()
  //   window.location.reload()
  // }

  render() {
    const { component: Component, token, ...rest } = this.props
    
    return (
      <Route {...rest} render={props => {
        // if (pending) return <div id="loader-wrapper">
				//   <div id="loader"></div>
				//   <div className="loader-section section-left"></div>
				//   <div className="loader-section section-right"></div>
			  // </div>
        return localStorage['access_token']
          ? <Component {...props} />
          : <Redirect to="/login" />
      }} />
    )
  }
}

// const stateToProps = ({ loggedUserState }) => ({
//   pending: loggedUserState.pending,
//   logged: loggedUserState.logged
// })
// function mapStateToProps(store) {
//   return {
//     pending: store.loggedUserState.pending
//   }
// }

export default PrivateRoute;
