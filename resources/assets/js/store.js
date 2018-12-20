import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga'
import mySagas  from './sagas/main';
// import { createBrowserHistory } from 'history'
import history from './myhistory'
import { routerMiddleware } from 'connected-react-router'
// import {MakeWatcher}  from './sagas/saga';

// const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers(history), applyMiddleware(routerMiddleware(history), sagaMiddleware));

sagaMiddleware.run(mySagas);

export default store;