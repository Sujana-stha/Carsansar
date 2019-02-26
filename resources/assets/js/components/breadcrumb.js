// Header

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import { withRouter } from 'react-router'

// class ShowTheLocation extends Component {
//   static propTypes = {
//     match: PropTypes.object.isRequired,
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired
//   }

//   render() {
//     const { match, location, history } = this.props

//     return (
//       <div>You are now at {location.pathname}</div>
//     )
//   }
// }
// const ShowTheLocationWithRouter = withRouter(ShowTheLocation)
const Breadcrumb = () => {
    return(
        
        <div>
          <div id="breadcrumbs-wrapper">
            
            <div className="header-search-wrapper grey lighten-2 hide-on-large-only">
              <input type="text" name="Search" className="header-search-input z-depth-2" placeholder="Explore Materialize" />
            </div>
            <div className="container">
              <div className="row">
                <div className="col s10 m6 l6">
                  <h5 className="breadcrumbs-title">Get Page Title</h5>
                  <ol className="breadcrumbs">
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/dashboard">Parent Page Title</NavLink></li>
                    <li className="active">Get Page Title</li>
                  </ol>
                </div>
                <div className="col s2 m6 l6">
                  {/* <a className="btn dropdown-settings waves-effect waves-light breadcrumbs-btn right gradient-45deg-light-blue-cyan gradient-shadow" href="#!" data-activates="dropdown1">
                    <i className="material-icons hide-on-med-and-up">settings</i>
                    <span className="hide-on-small-onl">Settings</span>
                    <i className="material-icons right">arrow_drop_down</i>
                  </a> */}
                  <ul id="dropdown1" className="dropdown-content">
                    <li><a href="#!" className="grey-text text-darken-2">Access<span className="badge">1</span></a>
                    </li>
                    <li><a href="#!" className="grey-text text-darken-2">Profile<span className="new badge">2</span></a>
                    </li>
                    <li><a href="#!" className="grey-text text-darken-2">Notifications</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
         </div>
          
    )
}

export default Breadcrumb;