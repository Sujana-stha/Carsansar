// Left Sidebar Nav

import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftSidebarNav = () => {
	return(
		<aside id="left-sidebar-nav" className="nav-expanded nav-lock nav-collapsible">
			<div className="brand-sidebar">
				<h1 className="logo-wrapper">
					<NavLink to="/" className="brand-logo darken-1">
						<img src="images/logo/materialize-logo.png" alt="CarSansar logo" />
						<span className="logo-text hide-on-med-and-down">whrepo</span> 
					</NavLink>
					{/* <a href="index.html" className="brand-logo darken-1">
						<img src="images/logo/materialize-logo.png" alt="CarSansar logo" />
						<span className="logo-text hide-on-med-and-down">CarSansar</span> 
					</a>*/}
					<a href="#" className="navbar-toggler">
						<i className="material-icons">radio_button_checked</i>
					</a>
				</h1>
			</div>
			<ul id="slide-out" className="side-nav fixed leftside-navigation">
				<li className="no-padding">
					<ul className="collapsible" data-collapsible="accordion">
						<li className="bold">
							<a className="collapsible-header waves-effect waves-cyan">
								<i className="material-icons">dashboard</i>
								<span className="nav-text">Dashboard</span>
							</a>
							<div className="collapsible-body">
								<ul>
											
									<li>
										<NavLink to="/">
											<i className="material-icons">keyboard_arrow_right</i>
											<span>Analytics</span>
										</NavLink>
									</li>
								</ul>
							</div>
						</li>
						<li className="bold">
							<a className="collapsible-header waves-effect waves-cyan active">
								<i className="material-icons">dvr</i>
								<span className="nav-text">Vehicles</span>
							</a>
							<div className="collapsible-body">
								<ul>
									<li>
										<NavLink to="/vehicles"><i className="material-icons">keyboard_arrow_right</i><span> Vehicles Listing</span></NavLink>
									</li>
									<li>
										<NavLink to="/insert-vehicle"><i className="material-icons">keyboard_arrow_right</i><span>Add Vehicle</span></NavLink>
									</li>
								</ul>
							</div>
						</li>
						<li className="bold">
							<a className="collapsible-header waves-effect waves-cyan active">
								<i className="material-icons">dvr</i>
								<span className="nav-text">Vehicle Attributes</span>
							</a>
							<div className="collapsible-body">
								<ul>
									<li>
										<NavLink to="/vehicle-attributes"><i className="material-icons">keyboard_arrow_right</i><span> Custom Atrributes</span></NavLink>
									</li>
									<li>
										<NavLink to="/insert-vehicle-attribute"><i className="material-icons">keyboard_arrow_right</i><span>Add Custom Attribute</span></NavLink>
									</li>
								</ul>
							</div>
							<div className="collapsible-body">
								<ul>
									<li>
										<NavLink to="/color"><i className="material-icons">keyboard_arrow_right</i><span> Colors</span></NavLink>
									</li>
								</ul>
							</div>
						</li>
						<li className="bold">
							<NavLink to="/color" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span> Colors</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/makes" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span> Makes</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/models" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span> Models</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/options-categories" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span> Options Categories</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/categories" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span>Categories</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/drives" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span>Drives</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/bodies" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span>Bodies</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/enginesizes" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span>Engine</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/fueltypes" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span>Fuel</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/transmissions" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span>Transmissions</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/companies" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span>Companies</span></NavLink>
						</li>
						<li className="bold">
							<NavLink to="/options" className="waves-effect waves-cyan"><i className="material-icons">keyboard_arrow_right</i><span>Options</span></NavLink>
						</li>
						<li className="bold">
							<a className="collapsible-header waves-effect waves-cyan active">
								<i className="material-icons">account_circle</i>
								<span className="nav-text">Users</span>
							</a>
							<div className="collapsible-body">
								<ul>
									<li>
										<NavLink to="/users"><i className="material-icons">keyboard_arrow_right</i><span> Users</span></NavLink>
									</li>
									<li>
										<NavLink to="/insert-user"><i className="material-icons">keyboard_arrow_right</i><span>Add User</span></NavLink>
									</li>
									<li>
										<NavLink to="/user-profile"><i className="material-icons">face</i><span> User Profile</span></NavLink>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</li>
			</ul>
			<a href="#" data-activates="slide-out" className="sidebar-collapse btn-floating btn-medium waves-effect waves-light hide-on-large-only gradient-45deg-light-blue-cyan gradient-shadow">
				<i className="material-icons">menu</i>
			</a>
		</aside>
	)
}

export default LeftSidebarNav;
