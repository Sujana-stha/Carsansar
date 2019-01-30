
// router.js

import React, { Component } from 'react';
//import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import Notifications from 'react-notify-toast';

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
// import InsertVehicle from './components/vehicles/insert-vehicle'
import AddVehicle from './components/vehicles/add-vehicle'
import UsersListing from './components/users/users'
import InsertUser from './components/users/insert-user'
import UserProfile from './components/users/user-profile'

import InsertVehicleAttribute from './components/vehicles/insert-vehicle-attribute'
import VehicleAttributes from './components/vehicles/vehicle-attributes'

import CompanyForm from './components/companies/companies-form'
import EditCompany from './components/companies/companies-edit'

//Containers
import InsertVehicleContainer from './containers/vehicles/insert-vehicle-containers'
import ColorListContainer from './containers/color/color-container'
import InsertColor from './containers/color/insert-color-container'
import MakesListContainer from './containers/makes/makes-container'
import ModelListContainer from './containers/model/model-container'
import OptionCategoriesContainer from './containers/optionCategories/optionCat-container'
import CategoriesContainer from './containers/categories/categories-container'
import DrivesContainer from './containers/drives/drives-container'
import BodiesContainer from './containers/bodies/bodies-container'
import EnginesizesContainer from './containers/enginesizes/enginesizes-container'
import FueltypesContainer from './containers/fueltypes/fueltypes-container'
import TransmissionContainer from './containers/transmissions/transmission-container'
import CompaniesContainer from './containers/companies/companies-container'
import OptionsContainer from './containers/options/options-container'

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
					<Notifications options={{top: '50px', right: '0px', width: '100%', margin:0, left: 'none'}}/>
                  	{/* start container */}

                	<div className="container">
							<Route exact path="/" component={DashboardAnalytics}></Route>
							<Route path="/vehicles" component={VehiclesListing}></Route>
							<Route path="/insert-vehicle" component={InsertVehicleContainer}></Route>
							<Route path="/vehicle-attributes" component={VehicleAttributes}></Route>
							<Route path="/insert-vehicle-attribute" component={InsertVehicleAttribute}></Route>
							<Route path="/color" component={ColorListContainer}></Route>
							<Route path="/insert-color" component={InsertColor}></Route>
							<Route path="/users" component={UsersListing}></Route>
							<Route path="/insert-user" component={InsertUser}></Route>
							<Route path="/user-profile" component={UserProfile}></Route>
							<Route path="/makes" component={MakesListContainer}></Route>
							{/* <Route path="/add-make" component={MakeForm}></Route> */}
							{/* <Route path="/makes/:id" component={MakesListContainer}/> */}
							<Route path="/models" component={ModelListContainer}></Route>
							<Route path="/options-categories" component={OptionCategoriesContainer}></Route>
							<Route path="/categories" component={CategoriesContainer}></Route>
							<Route path="/drives" component={DrivesContainer}></Route>
							<Route path="/bodies" component={BodiesContainer}></Route>
							<Route path="/enginesizes" component={EnginesizesContainer}></Route>
							<Route path="/fueltypes" component={FueltypesContainer}></Route>
							<Route path="/transmissions" component={TransmissionContainer}></Route>
							<Route path="/companies" component={CompaniesContainer}></Route>
							<Route path="/options" component={OptionsContainer} />

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



