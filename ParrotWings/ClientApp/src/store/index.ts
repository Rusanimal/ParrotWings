import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

const enhancers = [];
const windowIfDefined = typeof window === 'undefined' ? null : window as any;
if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
}

const store = configureStore({
    reducer: createRootReducer(history),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)),
    ...enhancers
});

export type ApplicationState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export default store