import * as React from 'react';
import { Switch } from 'react-router';
import Home from './components/pages/Home';
import './custom.css'
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import LoginRoute from './components/LoginRoute';
import CreateTransaction from './components/pages/CreateTransaction';

export default () => {
    return (
            <Switch>
                <ProtectedRoute exact={true} path='/' component={Home} />
                <ProtectedRoute path='/createTransaction' component={CreateTransaction} />
                <LoginRoute path='/login' component={Login} />
                <LoginRoute path='/register' component={Register} />
            </Switch>
    );
};
