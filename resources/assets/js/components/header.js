// Header

import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import {logoutRequest} from '../actions/login-action'
import * as api from '../api/users-api'

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		}
	}
	componentDidMount() {
		api.getUsers().then(response=> {
			console.log(response);
			this.setState({
				user: response.data
			})

		})
	}
	
	render() {
    return(
      <div>
			
			<div id="loader-wrapper">
				<div id="loader"></div>
				<div className="loader-section section-left"></div>
				<div className="loader-section section-right"></div>
			</div>
			 

			<header id="header" className="page-topbar">
			
			{ /* start header nav */}
		      <div className="navbar-fixed">
		        <nav className="navbar-color">
		          <div className="nav-wrapper">
		            
		            <div className="header-search-wrapper hide-on-med-and-down sideNav-lock">
		              <i className="material-icons">search</i>
		              <input type="text" name="Search" className="header-search-input z-depth-2" placeholder="Explore Materialize" />
		            </div>
		            <ul className="right hide-on-med-and-down">
		              <li>
		                <a href="javascript:void(0);" className="waves-effect waves-block waves-light translation-button" data-activates="translation-dropdown">
		                  <span className="flag-icon flag-icon-gb"></span>
		                </a>
		              </li>
		              <li>
		                <a href="javascript:void(0);" className="waves-effect waves-block waves-light toggle-fullscreen">
		                  <i className="material-icons">settings_overscan</i>
		                </a>
		              </li>
		              <li>
		                <a href="javascript:void(0);" className="waves-effect waves-block waves-light notification-button" data-activates="notifications-dropdown">
		                  <i className="material-icons">notifications_none
		                    <small className="notification-badge pink accent-2">5</small>
		                  </i>
		                </a>
		              </li>
		              <li>
		                <a href="javascript:void(0);" className="waves-effect waves-block waves-light profile-button" data-activates="profile-dropdown">
		                  <span className="avatar-status avatar-online">
		                    <img src="images/avatar/avatar-7.png" alt="avatar" />
											
		                    <i></i>
		                  </span>
		                </a>
		              </li>
		              <li>
		                <a href="#" data-activates="chat-out" className="waves-effect waves-block waves-light chat-collapse">
		                  <i className="material-icons">format_indent_increase</i>
		                </a>
		              </li>
		            </ul>
		            {/* translation-button */}
		            <ul id="translation-dropdown" className="dropdown-content">
		              <li>
		                <a href="#!" className="grey-text text-darken-1">
		                  <i className="flag-icon flag-icon-gb"></i> English</a>
		              </li>
		              <li>
		                <a href="#!" className="grey-text text-darken-1">
		                  <i className="flag-icon flag-icon-fr"></i> French</a>
		              </li>
		              <li>
		                <a href="#!" className="grey-text text-darken-1">
		                  <i className="flag-icon flag-icon-cn"></i> Chinese</a>
		              </li>
		              <li>
		                <a href="#!" className="grey-text text-darken-1">
		                  <i className="flag-icon flag-icon-de"></i> German</a>
		              </li>
		            </ul>
		            { /* notifications-dropdown */}
		            <ul id="notifications-dropdown" className="dropdown-content">
		              <li>
		                <h6>NOTIFICATIONS
		                  <span className="new badge">5</span>
		                </h6>
		              </li>
		              <li className="divider"></li>
		              <li>
		                <a href="#!" className="grey-text text-darken-2">
		                  <span className="material-icons icon-bg-circle cyan small">add_shopping_cart</span> A new order has been placed!</a>
		                <time className="media-meta" dateTime="2015-06-12T20:50:48+08:00">2 hours ago</time>
		              </li>
		              <li>
		                <a href="#!" className="grey-text text-darken-2">
		                  <span className="material-icons icon-bg-circle red small">stars</span> Completed the task</a>
		                <time className="media-meta" dateTime="2015-06-12T20:50:48+08:00">3 days ago</time>
		              </li>
		              <li>
		                <a href="#!" className="grey-text text-darken-2">
		                  <span className="material-icons icon-bg-circle teal small">settings</span> Settings updated</a>
		                <time className="media-meta" dateTime="2015-06-12T20:50:48+08:00">4 days ago</time>
		              </li>
		              <li>
		                <a href="#!" className="grey-text text-darken-2">
		                  <span className="material-icons icon-bg-circle deep-orange small">today</span> Director meeting started</a>
		                <time className="media-meta" dateTime="2015-06-12T20:50:48+08:00">6 days ago</time>
		              </li>
		              <li>
		                <a href="#!" className="grey-text text-darken-2">
		                  <span className="material-icons icon-bg-circle amber small">trending_up</span> Generate monthly report</a>
		                <time className="media-meta" dateTime="2015-06-12T20:50:48+08:00">1 week ago</time>
		              </li>
		            </ul>
		          {/* profile-dropdown */}
		            <ul id="profile-dropdown" className="dropdown-content">
									<li>
										<a href="#" className="grey-text text-darken-1">{this.state.user.name}
										</a>
									</li>
		              <li>
										<NavLink to="/user-profile" className="grey-text text-darken-1">
		                	<i className="material-icons">face</i> Profile
										</NavLink>
		              </li>
		              {/* <li>
		                <a href="#" className="grey-text text-darken-1">
		                  <i className="material-icons">settings</i> Settings</a>
		              </li> */}
		              <li>
		                <a href="#" className="grey-text text-darken-1">
		                  <i className="material-icons">live_help</i> Help</a>
		              </li>
		              <li className="divider"></li>
		              {/* <li>
		                <a href="#" className="grey-text text-darken-1">
		                  <i className="material-icons">lock_outline</i> Lock</a>
		              </li> */}
		              <li>
		                <a href="#" className="grey-text text-darken-1" onClick={this.props.logoutRequest}>
		                  <i className="material-icons">keyboard_tab</i> Logout</a>
		              </li>
		            </ul>
		          </div>
		        </nav>
		      </div>
      {/* end header nav */}
     
    </header>
        </div>
		)
	}
}

export default connect(null, {logoutRequest})(Header);