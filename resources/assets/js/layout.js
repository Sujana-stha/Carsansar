import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Notifications from 'react-notify-toast';
import PrivateRoute from './privateRouter';

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
import UsersListing from './components/users/users'

import UserProfile from './components/users/user-profile'
import InsertVehicleAttribute from './components/vehicles/insert-vehicle-attribute'
import VehicleAttributes from './components/vehicles/vehicle-attributes'

//Containers
import InsertVehicleContainer from './containers/vehicles/insert-vehicle-containers'
import InsertUserContainer from './containers/users/insertUsers-containers'
import ColorListContainer from './containers/color/color-container'
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

class DashboardLayout extends Component  {
    // console.log('sdss', match)
    // componentWillMount() {
    //     loadjs('/static/js/jquery.min.js', function() {
    //       loadjs('/static/js/plugins.js', function() {
    //         loadjs('/static/js/custom-script.js');
    //       });
    //     });
    //   }
   
    render() {
        return (
            <div className="app">
                <Header/>
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
                                <Switch>
                                    <Route exact path='/' component={DashboardAnalytics}/>
                                    <Route path='/vehicles' component={VehiclesListing}/>
                                    <Route path='/insert-vehicle' component={InsertVehicleContainer}/>
                                    <Route path="/vehicle-attributes" component={VehicleAttributes}/>
							        <Route path="/insert-vehicle-attribute" component={InsertVehicleAttribute}/>
							        <Route path="/color" component={ColorListContainer}/>
							        <Route path="/users" component={UsersListing}/>
							        <Route path="/insert-user" component={InsertUserContainer}/>
							        <Route path="/user-profile" component={UserProfile}/>
							        <Route path="/makes" component={MakesListContainer}/>
                                    <Route path="/models" component={ModelListContainer}/>
                                    <Route path="/options-categories" component={OptionCategoriesContainer}/>
                                    <Route path="/categories" component={CategoriesContainer}/>
                                    <Route path="/drives" component={DrivesContainer}/>
                                    <Route path="/bodies" component={BodiesContainer}/>
                                    <Route path="/enginesizes" component={EnginesizesContainer}/>
                                    <Route path="/fueltypes" component={FueltypesContainer}/>
                                    <Route path="/transmissions" component={TransmissionContainer}/>
                                    <Route path="/companies" component={CompaniesContainer}/>
                                    <Route path="/options" component={OptionsContainer} />
                                    <Redirect to='/'/>
                                </Switch>
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
    }
};

export default DashboardLayout;
