
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import promiseMiddleware from 'redux-promise';
// import Main from './components/main';


// // REDUCERS
// import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

// ReactDOM.render(
// <Provider store={createStoreWithMiddleware(reducers)}>
//     <Main />
// </Provider>, document.getElementById('root'));



// import React from 'react';
// import { render } from 'react-dom';
// import { Router, Route, BrowserHistory } from 'react-router';

// import Main from './components/main';
// render(<Main />, document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store from './store';
// import {Router} from './router';
import {Route, Switch, Redirect} from 'react-router-dom';
// import { createBrowserHistory } from 'history'
import history from './myhistory';
import LoginFormContainer from './containers/login/loginFormContainer'
import DashboardLayout from './layout'
import  PrivateRoute  from './privateRouter';
import Notifications from 'react-notify-toast';


// const history = createBrowserHistory();

//require('es6-promise').polyfill();

// Provider is a top-level component that wrapps our entire application, including
// the Router. We pass it a reference to the store so we can use react-redux's
// connect() method for Component Containers.
ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history = {history}>
				<div>
				<Notifications options={{top: '50px', right: '0px', width: '100%', margin:0, left: 'none'}}/>
				<Switch>
					<Route path="/login" component={LoginFormContainer}/>
					<PrivateRoute path="/" component={DashboardLayout}/>
					<Redirect to="/login"/>
				</Switch>
				</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);