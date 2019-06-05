import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store'
import Notifications from 'react-notify-toast';
import {requestLoggedUser} from '../actions/users-action'
import loadjs from 'loadjs';
// import PrivateRoute from './privateRouter';


//includes
import Header from '../components/header'
import Breadcrumb from '../components/breadcrumb'
import Footer from '../components/footer'
import FloatingActionButton from '../components/floating-action-button'
import LeftSidebarNav from '../components/nav/left-sidebar-nav'
import RightSidebarNav from '../components/nav/right-sidebar-nav'

//Components

import DashboardAnalytics from '../components/dashboard/dashboard-analytics'
import UsersListing from '../components/users/users'
import UserProfile from '../components/users/user-profile'
import ImagesPreview from '../components/vehicles/imagePreview'

//Containers
import VehiclesListingContainer from '../containers/vehicles/vehicles-listing-container'
import InsertVehicleContainer from '../containers/vehicles/insert-vehicle-containers'
import EditVehicleForm from '../containers/vehicles/edit-vehicle-form';
// import EditVehicleFormContainer from '../containers/vehicles/edit-vehicle-container'
import ImportFile from '../containers/import-file'
import InsertUserContainer from '../containers/users/insertUsers-containers'
import ColorListContainer from '../containers/color/color-container'
import MakesListContainer from '../containers/makes/makes-container'
import ModelListContainer from '../containers/model/model-container'
import OptionCategoriesContainer from '../containers/optionCategories/optionCat-container'
import CategoriesContainer from '../containers/categories/categories-container'
import DrivesContainer from '../containers/drives/drives-container'
import BodiesContainer from '../containers/bodies/bodies-container'
import EnginesizesContainer from '../containers/enginesizes/enginesizes-container'
import FueltypesContainer from '../containers/fueltypes/fueltypes-container'
import TransmissionContainer from '../containers/transmissions/transmission-container'
import CompaniesContainer from '../containers/companies/companies-container'
import OptionsContainer from '../containers/options/options-container'

class DashboardLayout extends Component {
    componentWillMount() {
        loadjs('/js/materialize-admin/vendors.min.js', function() {
            loadjs('/js/materialize-admin/plugins.js', function() {
                loadjs('/js/materialize-admin/custom/custom-script.js');
            });
        });
    }
    componentDidMount() {
        document.body.classList.remove('login-bg')
        document.body.classList.remove('1-column')
        document.body.classList.remove('blank-page')
        document.body.classList.add('2-columns');
        this.props.requestLoggedUser();
    }
    render() {
        const {match} = this.props
        const userName = window.Laravel.super_admin
        return (
            <div className="app">
                <Notifications options={{top: '50px', right: '0px', width: '100%', margin:0, left: 'none'}}/>
                {/* BEGIN: Header */}
                <Header authUser ={ this.props.loggedUser}/>
                {/* END: Header */}

                {/* BEGIN: SideNav */}
                <LeftSidebarNav userRole ={userName} authUser ={ this.props.loggedUser}/>
                {/* END: SideNav */}

                { /* BEGIN: Page Main */}
                <div id="main">
                    <div className="row">
                        {/* <div className="content-wrapper-before blue-grey lighten-5"></div> */}
                        <div className="col s12">
                            <Breadcrumb/>
                            {/* start container */}
                            <div className="container">
                                <Switch>
                                    <Route exact path={`${match.path}`} component={DashboardAnalytics}/>
                                    <Route path={`${match.path}/vehicles`} component={VehiclesListingContainer}/>
                                    <Route path={`${match.path}/insert-vehicle`} component={InsertVehicleContainer}/>
                                    <Route path={`${match.path}/edit-vehicle/:id`} component={EditVehicleForm}/>
                                    <Route path={`${match.path}/import`} component={ImportFile}/>
                                    <Route path={`${match.path}/colors`} component={ColorListContainer}/>
                                    <Route path={`${match.path}/users`} component={UsersListing}/>
                                    <Route path={`${match.path}/insert-user`} component={InsertUserContainer}/>
                                    <Route path={`${match.path}/user-profile`} component={UserProfile}/>
                                    <Route path={`${match.path}/makes`} component={MakesListContainer}/>
                                    <Route path={`${match.path}/models`} component={ModelListContainer}/>
                                    <Route path={`${match.path}/options-categories`} component={OptionCategoriesContainer}/>
                                    <Route path={`${match.path}/categories`} component={CategoriesContainer}/>
                                    <Route path={`${match.path}/drives`} component={DrivesContainer}/>
                                    <Route path={`${match.path}/bodies`} component={BodiesContainer}/>
                                    <Route path={`${match.path}/enginesizes`} component={EnginesizesContainer}/>
                                    <Route path={`${match.path}/fueltypes`} component={FueltypesContainer}/>
                                    <Route path={`${match.path}/transmissions`} component={TransmissionContainer}/>
                                    <Route path={`${match.path}/companies`} component={CompaniesContainer}/>
                                    <Route path={`${match.path}/options`} component={OptionsContainer}/>
                                    <Redirect to={`${match.url}`} />
                                </Switch>
                                <RightSidebarNav />
                            </div>
                            {/* end container */}
                        </div>
                        <FloatingActionButton />

                        {/* END WRAPPER */}
                    </div>
                    {/* END MAIN */}
                </div>
                <Footer />
            </div>
        )
    }
}
function mapStateToProps(store) {
    return {
		loggedUser: store.userState.loggedUser
	}
}

export default withRouter(connect(mapStateToProps, { requestLoggedUser})(DashboardLayout));
