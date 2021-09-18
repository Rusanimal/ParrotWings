import * as React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import Layout from './containers/Layout';
import MainLayout from './containers/MainLayout';
import { useAppSelector } from '../hooks';

export const ProtectedRoute: React.FC<RouteProps> = props => {
    const currentLocation = useLocation();
    const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);

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