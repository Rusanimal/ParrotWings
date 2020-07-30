import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store';
import Layout from './containers/Layout';
import MainLayout from './containers/MainLayout';

export const ProtectedRoute: React.FC<RouteProps> = props => {
    const currentLocation = useLocation();
    const selectIsAuthenticated = (state: ApplicationState) => state.account.isAuthenticated;
    const isAuthenticated = useSelector(selectIsAuthenticated);

    let redirectPath = currentLocation.pathname;
    if (!isAuthenticated) {
        redirectPath = "/login";
    }

    if (redirectPath !== currentLocation.pathname) {
        const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
        return <Layout><Route {...props} component={renderComponent} render={undefined} /></Layout>;
    } else {
        return <MainLayout><Route {...props} /></MainLayout>;
    }
};

export default ProtectedRoute;