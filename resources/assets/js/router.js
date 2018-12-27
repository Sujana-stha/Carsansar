
// router.js

import React, { Component } from 'react';
//import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Route, Switch } from 'react-router-dom';


//includes
import Header from './components/header'
import Breadcrumb from './components/breadcrumb'
import Footer from './components/footer'
import FloatingActionButton from './components/floating-action-button'
import LeftSidebarNav from './components/nav/left-sidebar-nav'
import RightSidebarNav from './components/nav/right-sidebar-nav'


//Components

import DashboardAnalytics from './components/dashboard/dashboard-analytics'
import VehiclesListing from './components/vehicles/vehicles-listing'
import InsertVehicle from './components/vehicles/insert-vehicle'
import UsersListing from './components/users/users'
import InsertUser from './components/users/insert-user'
import UserProfile from './components/users/user-profile'

import InsertVehicleAttribute from './components/vehicles/insert-vehicle-attribute'
import VehicleAttributes from './components/vehicles/vehicle-attributes'

//Containers
import ColorListContainer from './containers/color/color-container'
import InsertColor from './containers/color/insert-color-container'
import MakesListContainer from './containers/makes/makes-container'
import ModelListContainer from './containers/model/model-container'
import OptionCategoriesContainer from './containers/optionCategories/optionCat-container'
import CategoriesContainer from './containers/categories/categories-container'

export default (
  
   	<div className="app">      
	    <Header />       
	        
 	    { /* START MAIN */}
 		<div id="main">
 			{/* START WRAPPER */}
 			<div className="wrapper">
				
 				<LeftSidebarNav />
					
 				{/* START CONTENT */}
                <section id="content">
                  	<Breadcrumb/>
                  	{/* start container */}
				
                	<div className="container">
							<Route exact path="/" component={DashboardAnalytics}></Route>
							<Route path="/vehicles" component={VehiclesListing}></Route>
							<Route path="/insert-vehicle" component={InsertVehicle}></Route>
							<Route path="/vehicle-attributes" component={VehicleAttributes}></Route>
							<Route path="/insert-vehicle-attribute" component={InsertVehicleAttribute}></Route>
							<Route path="/color" component={ColorListContainer}></Route>
							<Route path="/insert-color" component={InsertColor}></Route>
							<Route path="/users" component={UsersListing}></Route>
							<Route path="/insert-user" component={InsertUser}></Route>
							<Route path="/user-profile" component={UserProfile}></Route>
							<Route path="/makes" component={MakesListContainer}></Route>
							{/* <Route path="/add-make" component={MakeForm}></Route> */}
							{/* <Route path="/edit-make/:id" component={EditMake}/> */}
							<Route path="/models" component={ModelListContainer}></Route>
							<Route path="/options-categories" component={OptionCategoriesContainer}></Route>
							<Route path="/categories" component={CategoriesContainer}></Route>


 					</div>
            
          
                  	{/* end container */}
                </section>
 				{/* END CONTENT */}
					
 				<FloatingActionButton />
					
 				<RightSidebarNav />
					
 			</div>
 			{/* END WRAPPER */}
 		</div>
		{/* END MAIN */}
		 
 	    <Footer />

    </div>
  );



