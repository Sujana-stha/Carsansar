import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Notifications from 'react-notify-toast';

//containers
import LoginFormContainer from '../containers/login/loginFormContainer'

const UnauthorizedLayout = () => (
    <div>
        <Notifications options={{top: '20px', right: '0px', width: '100%', margin:0, left: 'none'}}/>
        <Switch>
            <Route path="/auth/login" component={LoginFormContainer}/>
            <Redirect to="/dashboard" />
        </Switch>
    </div>
)

export default UnauthorizedLayout