import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store'
import Notifications from 'react-notify-toast';
import { requestLoggedUser } from '../actions/users-action'
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
import UserProfile from '../components/users/user-profile'
import MasterRoute from './masterRoute'
import ManagerRoute from './managerRoute'

//Containers
import VehiclesContainer from '../containers/vehicles/vehicles-container'
import ImportFileContainer from '../containers/vehicles/importFile-container'
import UsersContainer from '../containers/users/users-container'
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
    
    componentWMount() {
        this.props.requestLoggedUser();
        
        loadjs('/js/materialize-admin/vendors.min.js', function () {
            loadjs('/js/materialize-admin/plugins.js', function () {
                loadjs('/js/materialize-admin/custom/custom-script.js');
            });
        });
    }
    componentDidMount() {
        document.body.classList.remove('login-bg')
        document.body.classList.remove('1-column')
        document.body.classList.remove('blank-page')
        document.body.classList.add('2-columns');
    }
    render() {
        const { match } = this.props
        console.log('match', this.props)
        const userName = process.env.MIX_SUPER_ADMIN_NAME;
        const loggedUser = localStorage.logged_user
        const role = localStorage.role
        return (
            <div className="app">
                <Notifications options={{ top: '50px', right: '0px', width: '100%', margin: 0, left: 'none' }} />
                {/* BEGIN: Header */}
                <Header authUser={this.props.loggedUser} />
                {/* END: Header */}

                {/* BEGIN: SideNav */}
                <LeftSidebarNav userRole={userName} authUser={this.props.loggedUser} />
                {/* END: SideNav */}

                { /* BEGIN: Page Main */}
                <div id="main">
                    <div className="row">
                        {/* <div className="content-wrapper-before blue-grey lighten-5"></div> */}
                        <div className="col s12">
                            <Breadcrumb />
                            {/* start container */}
                            <div className="container">
                                 <Switch>
                                    <Route exact path={`${match.path}`} component={DashboardAnalytics} />
                                    <Route path="/vehicles" component={VehiclesContainer} />
                                    <Route path="/insert-vehicle" component={VehiclesContainer} />
                                    <Route path="/edit-vehicle" component={VehiclesContainer} />
                                    <Route path="/import" component={ImportFileContainer} />
                                    <Route path="/user-profile" component={UserProfile} />
                                    
                                    <MasterRoute adminUser={userName} authUser={loggedUser} role={role} path="/users" component={UsersContainer}/>
                                    <MasterRoute adminUser={userName} authUser={loggedUser} role={role} path="/insert-user" component={UsersContainer}/>
                                    <MasterRoute adminUser={userName} authUser={loggedUser} role={role} path="/edit-user" component={UsersContainer}/>
                                    <MasterRoute adminUser={userName} authUser={loggedUser} role={role} path="/companies" component={CompaniesContainer}/>
                                    
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/colors" component={ColorListContainer}/>
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/makes" component={MakesListContainer} />
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/models" component={ModelListContainer} />
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/options-categories" component={OptionCategoriesContainer} />
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/categories" component={CategoriesContainer} />
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/drives" component={DrivesContainer} />
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/bodies" component={BodiesContainer} />
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/enginesizes" component={EnginesizesContainer} />
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/fueltypes" component={FueltypesContainer} />
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/transmissions" component={TransmissionContainer} />
                                    <ManagerRoute adminUser={userName} authUser={loggedUser} role={role} path="/options" component={OptionsContainer} />

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

export default connect(mapStateToProps, { requestLoggedUser })(DashboardLayout);
