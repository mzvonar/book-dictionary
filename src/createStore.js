// @flow
/* eslint-env node */
import { createStore, applyMiddleware } from 'redux';
import type { Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga'
import type { State, Action, Dispatch } from './types';
import apiMiddleware from './middlewares/api';
import type { Config as ApiConfig } from './middlewares/api';
import rootReducer from './reducers';
import saga from './sagas';

const initialStoreState = {};

const composeEnhancers = composeWithDevTools({
    name: 'book-dictionary',
    trace: true,
    traceLimit: 30
});

export type Config = $ReadOnly<{
    api: ApiConfig
}>;

export default function(initialState: State = initialStoreState, customMiddlewares?: $ReadOnlyArray<Middleware<State, Action, Dispatch>>, config?: Config = {}) {
    config = {
        ...config
    };

    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [
        apiMiddleware(config.api),
        sagaMiddleware
    ];


    if(process.env.NODE_ENV !== 'production') {
        const userTiming = require('./middlewares/userTiming').default; // eslint-disable-line global-require
        middlewares.push(userTiming);
    }

    const enhancers = composeEnhancers(
        applyMiddleware(
            ...middlewares,
            ...customMiddlewares || []
        )
    );

    const store = createStore<State, Action, Dispatch>(
        rootReducer,
        initialState,
        enhancers
    );

    sagaMiddleware.run(saga);

    if(process.env.NODE_ENV !== 'production') { //eslint-disable-line no-undef
        // $FlowFixMe
        if(module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('./reducers', () => {
                const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
                store.replaceReducer(nextRootReducer)
            })
        }
    }

    return store;
}
