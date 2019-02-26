import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga'
import mySagas  from './sagas/main';
// import { createBrowserHistory } from 'history'
import history from './myhistory'
import { routerMiddleware } from 'connected-react-router'
// import {MakeWatcher}  from './sagas/saga';

// const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(reducers(history), composeSetup(applyMiddleware(routerMiddleware(history), sagaMiddleware)));

sagaMiddleware.run(mySagas);

export default store;