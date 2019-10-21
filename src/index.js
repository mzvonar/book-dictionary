import React from 'react';
import ReactDOM from 'react-dom';
import getAuthorizationToken from './utils/getAuthozirationToken';
import createStore from './createStore';
import Main from './modules/Main';


document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('main-app');
    if(container === null) {
        throw new Error('Cannot render app. Container element not found');
    }

    const store = createStore(undefined, null, {
        api: {
            authorization: getAuthorizationToken
        }
    });

    ReactDOM.render(
        <Main store={store} />,
        container
    );
});