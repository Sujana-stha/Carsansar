import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga'
import {rootSaga}  from './sagas/saga';
// import { createBrowserHistory } from 'history'
import history from './myhistory'
import { routerMiddleware } from 'connected-react-router'
// import {MakeWatcher}  from './sagas/saga';

// const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers(history), applyMiddleware(routerMiddleware(history), sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;