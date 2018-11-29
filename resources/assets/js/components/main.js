// main.js

import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
//Components
import Header from './header'
import Breadcrumb from './breadcrumb'
import Footer from './footer'
import FloatingActionButton from './floating-action-button'
import LeftSidebarNav from './nav/left-sidebar-nav'
import RightSidebarNav from './nav/right-sidebar-nav'
import DashboardAnalytics from './dashboard/dashboard-analytics'
import VehiclesListing from './vehicles/vehicles-listing'
import InsertVehicle from './vehicles/insert-vehicle'

import InsertVehicleAttribute from './vehicles/insert-vehicle-attribute'
import VehicleAttributes from './vehicles/vehicle-attributes'

//Containers
import Color from '../containers/color/color'
import InsertColor from '../containers/color/insert-color'

class Main extends Component {
    render() {
        return (
	        <BrowserRouter>
	        <div>
	        <Header />
	        
	        
	        {/* START MAIN */}
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
							<Route path="/color" component={Color}></Route>
							<Route path="/insert-color" component={InsertColor}></Route>
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
	       </BrowserRouter> 
        );
        
    }
}

export default Main;