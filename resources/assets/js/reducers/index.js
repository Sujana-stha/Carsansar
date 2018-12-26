import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router'
// import { createPaginator } from 'violet-paginator';

//REDUCER
import colorReducer from './colors_reducer';
import makeReducer from './makes_reducer';
import modelReducer from './model_reducer';
import optionCatReducer from './optionCat_reducer'

const rootReducer = (history) => combineReducers({
    colorState: colorReducer,
    makeState: makeReducer,
    modelState: modelReducer,
    OptCatState: optionCatReducer,
    form: formReducer,
    router: connectRouter(history),
});

export default rootReducer;