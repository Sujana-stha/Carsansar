import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router'
// import { createPaginator } from 'violet-paginator';

//REDUCER
import colorReducer from './colors_reducer';
import makeReducer from './makes_reducer';
import modelReducer from './model_reducer';
import optionCatReducer from './optionCat_reducer';
import categoriesReducer from './categories_reducer';
import optionReducer from './options_reducer';
import driveReducer from './drives_reducer';
import bodyReducer from './bodies_reducer';
import enginesizeReducer from './enginesize_reducer';
import fueltypeReducer from './fueltype_reducer';
import transmissionReducer from './transmission_reducer';
import companyReducer from './company_reducer';
import dealsReducer from './deals_reducer';
import loginReducer from './login_reducers'
import LoggedUserReducer from './loggedUserReducer'
import UsersReducer from './users_reducer'

const rootReducer = (history) => combineReducers({
    form: formReducer,
    router: connectRouter(history),
    
    colorState: colorReducer,
    makeState: makeReducer,
    modelState: modelReducer,
    OptCatState: optionCatReducer,
    categoryState: categoriesReducer,
    optionState: optionReducer,
    driveState: driveReducer,
    bodyState: bodyReducer,
    enginesizeState: enginesizeReducer,
    fueltypeState: fueltypeReducer,
    transmissionState: transmissionReducer,
    companyState: companyReducer,
    dealState: dealsReducer,
    loginState: loginReducer,
    loggedUserState:LoggedUserReducer,
    userState: UsersReducer
});

export default rootReducer;