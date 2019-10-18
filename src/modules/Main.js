// @flow
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { IntlProvider } from 'react-intl';
import type { Store } from '../types';
import App from './App';

type Props = {
    store: Store
};

function Main({ store }: Props) {
    return (
        <ReduxProvider store={store}>
            <IntlProvider locale="en">
                <App />
            </IntlProvider>
        </ReduxProvider>
    );
}

export default hot(Main);