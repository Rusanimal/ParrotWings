import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store';
import MainLayout from './containers/MainLayout';
import Layout from './containers/Layout';

export const LoginRoute: React.FC<RouteProps> = props => {
    const currentLocation = useLocation();
    const selectIsAuthenticated = (state: ApplicationState) => state.account.isAuthenticated;
    const isAuthenticated = useSelector(selectIsAuthenticated);

    let redirectPath = currentLocation.pathname;
    if (isAuthenticated) {
        redirectPath = "/";
    }

    if (redirectPath !== currentLocation.pathname) {
        const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
        return <MainLayout><Route {...props} component={renderComponent} render={undefined} /></MainLayout>;
    } else {
        return <Layout><Route {...props} /></Layout>;
    }
};

export default LoginRoute;