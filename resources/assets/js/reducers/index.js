import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router'


//REDUCER
import colorReducer from './colors_reducer';
import makeReducer from './makes_reducer';

const rootReducer = (history) => combineReducers({
    colorState: colorReducer,
    makeState: makeReducer,
    form: formReducer,
    router: connectRouter(history)
});

export default rootReducer;