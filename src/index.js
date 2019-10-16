import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/App';


document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('main-app');
    if(container === null) {
        throw new Error('Cannot render app. Container element not found');
    }

    ReactDOM.render(
        <App />,
        container
    );
});