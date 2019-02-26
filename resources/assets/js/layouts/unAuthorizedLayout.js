import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

//containers
import LoginFormContainer from '../containers/login/loginFormContainer'

const UnauthorizedLayout = () => (
    <div>
        <Switch>
            <Route path="/auth/login" component={LoginFormContainer}/>
            <Redirect to="/dashboard" />
        </Switch>
    </div>
)

export default UnauthorizedLayout