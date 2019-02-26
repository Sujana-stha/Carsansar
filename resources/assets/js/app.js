import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from './store';
import {Route, Switch, Redirect} from 'react-router-dom';
import history from './myhistory';
import PrivateRoute from './privateRouter';

// layouts
import DashboardLayout from './layouts/primaryLayout'
import UnauthorizedLayout from './layouts/unAuthorizedLayout'


// Provider is a top-level component that wrapps our entire application, including
// the Router. We pass it a reference to the store so we can use react-redux's
// connect() method for Component Containers.
ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history = {history}>
				<Switch>
					<Route path="/auth" component={UnauthorizedLayout}/>
					<PrivateRoute path="/dashboard" component={DashboardLayout}/>
					<Redirect to="/auth"/>
				</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);