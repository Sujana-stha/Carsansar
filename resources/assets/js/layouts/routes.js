import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

//COMPONENTS
import DashboardAnalytics from '../components/dashboard/dashboard-analytics'
import UserProfile from '../components/users/user-profile'

//CONTAINERS
import VehiclesContainer from '../containers/vehicles/vehicles-container'
import ImportFile from '../containers/import-file'
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


//props.adminUser == props.authUser.username || props.authUser.role === "Manager"
const AuthorizedRoute = (props) => {
        return (
            <Switch>
                <Route exact path={`${props.match.path}`} component={DashboardAnalytics} />
                <Route path={`${props.match.path}/vehicles`} component={VehiclesContainer} />
                <Route path={`${props.match.path}/insert-vehicle`} component={VehiclesContainer} />
                <Route path={`${props.match.path}/edit-vehicle`} component={VehiclesContainer} />
                <Route path={`${props.match.path}/import`} component={ImportFile} />
                <Route path={`${props.match.path}/user-profile`} component={UserProfile} />
                
                {props.adminUser == props.authUser.username ? (
                <Route path={`${props.match.path}/users`} component={UsersContainer} />
                ): <Redirect to={`${props.match.url}`} />}
                
                {props.adminUser == props.authUser.username ? (
                <Route path={`${props.match.path}/insert-user`} component={UsersContainer} />
                ): <Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username ? (
                <Route path={`${props.match.path}/edit-user`} component={UsersContainer} />
                ): <Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username ? (
                <Route path={`${props.match.path}/companies`} component={CompaniesContainer} />
                ): <Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/colors`} component={ColorListContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/makes`} component={MakesListContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/models`} component={ModelListContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/options-categories`} component={OptionCategoriesContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/categories`} component={CategoriesContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/drives`} component={DrivesContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/bodies`} component={BodiesContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/enginesizes`} component={EnginesizesContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/fueltypes`} component={FueltypesContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/transmissions`} component={TransmissionContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                {props.adminUser == props.authUser.username || props.authUser.role === "Manager" ? (
                <Route path={`${props.match.path}/options`} component={OptionsContainer} />
                ):<Redirect to={`${props.match.url}`} />}

                <Redirect to={`${props.match.url}`} />
               
            </Switch>
        )
               
};

export default AuthorizedRoute;