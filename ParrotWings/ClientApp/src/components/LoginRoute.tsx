import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import MainLayout from './containers/MainLayout';
import Layout from './containers/Layout';
import { useAppSelector } from '../hooks';

export const LoginRoute: React.FC<RouteProps> = props => {
    const currentLocation = useLocation();
    const isAuthenticated = useAppSelector(state =>state.account.isAuthenticated);

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