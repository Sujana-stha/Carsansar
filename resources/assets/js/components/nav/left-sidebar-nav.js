// Left Sidebar Nav

import React from 'react'
import { NavLink } from 'react-router-dom'

const LeftSidebarNav = (props) => {
	return(
		<aside className="sidenav-main nav-expanded nav-lock nav-collapsible sidenav-light navbar-full sidenav-active-rounded">
			<div className="brand-sidebar">
				<h1 className="logo-wrapper"><NavLink to="/dashboard" className="brand-logo darken-1"><img src="/images/logo/materialize-logo.png" alt="materialize logo"/><span className="logo-text hide-on-med-and-down">Materialize</span></NavLink><a className="navbar-toggler" href="#"><i className="material-icons">radio_button_checked</i></a></h1>
			</div>
			<ul className="sidenav sidenav-collapsible leftside-navigation collapsible sidenav-fixed menu-shadow" id="slide-out" data-menu="menu-navigation" data-collapsible="menu-accordion">
		  		<li className="active bold"><a className="collapsible-header waves-effect waves-cyan " href="#"><i className="material-icons">settings_input_svideo</i><span className="menu-title" data-i18n="">Dashboard</span><span className="badge badge pill orange float-right mr-10">3</span></a>
					<div className="collapsible-body">
						<ul className="collapsible collapsible-sub" data-collapsible="accordion">
							<li className="active"><NavLink to="/dashboard" className="collapsible-body active"><i className="material-icons">radio_button_unchecked</i><span>Dashboard Analytics</span></NavLink>
							</li>
						</ul>
					</div>
		  		</li>
				<li className="bold"><a className="collapsible-header waves-effect waves-cyan " href="#"><i className="material-icons">dvr</i><span className="menu-title" data-i18n="">Vehicles</span></a>
					<div className="collapsible-body">
						<ul className="collapsible collapsible-sub" data-collapsible="accordion">
							<li>
								<NavLink to="/dashboard/vehicles" className="collapsible-body collapsible-header waves-effect waves-cyan"><i className="material-icons">radio_button_unchecked</i><span>Vehicles Listing</span></NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/insert-vehicle" className="collapsible-body collapsible-header waves-effect waves-cyan"><i className="material-icons">radio_button_unchecked</i><span>Add Vehicle</span></NavLink>
							</li>
							
						</ul>
					</div>
				</li>
		  		<li className="bold">
				  <NavLink to="/dashboard/import" className="collapsible-body collapsible-header waves-effect waves-cyan"><i className="material-icons">file_upload</i><span>Import</span></NavLink>
				</li>
				{props.userRole === props.authUser.name ? ( 
					<li className="navigation-header">
						<a className="navigation-header-text">Attributes </a><i className="navigation-header-icon material-icons">more_horiz</i>
					</li>
				) : null}
				{props.userRole === props.authUser.name ? ( 
					<li className="bold">
						<a className="collapsible-header waves-effect waves-cyan " href="#"><i className="material-icons">add_to_queue</i><span className="menu-title" data-i18n="">Vehicles Attributes</span></a>
						<div className="collapsible-body">
							<ul className="collapsible collapsible-sub" data-collapsible="accordion">
								<li>
									<NavLink to="/dashboard/vehicle-attributes" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Custom Attributes</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/insert-vehicle-attribute" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Add Custom Attributes</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/colors" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Colors</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/makes" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Makes</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/models" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Models</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/options-categories" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Options Categories</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/categories" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Categories</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/drives" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Drives</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/bodies" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Bodies</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/enginesizes" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Enginesizes</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/fueltypes" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Fuel Types</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/transmissions" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Transmissions</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/companies" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Companies</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/options" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Options</span></NavLink>
								</li>
							</ul>
						</div>
					</li>
				): null }
				{props.userRole === props.authUser.name ? (
					<li className="bold"><a className="collapsible-header waves-effect waves-cyan " href="#"><i className="material-icons">face</i><span className="menu-title" data-i18n="">Users</span></a>
						<div className="collapsible-body">
							<ul className="collapsible collapsible-sub" data-collapsible="accordion">
								<li>
									<NavLink to="/dashboard/users" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Users</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/insert-user" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>Add New User</span></NavLink>
								</li>
								<li>
									<NavLink to="/dashboard/user-profile" className="collapsible-body" data-i18n=""><i className="material-icons">radio_button_unchecked</i><span>User Profile</span></NavLink>
								</li>
							</ul>
						</div>
					</li>
				):null}
			</ul>
			<div className="navigation-background"></div><a className="sidenav-trigger btn-sidenav-toggle btn-floating btn-medium waves-effect waves-light hide-on-large-only" href="#" data-target="slide-out"><i className="material-icons">menu</i></a>
	  	</aside>
	)
}

export default LeftSidebarNav;
