// @flow
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debug from 'debug';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from '../../services/firebase';
import userActions from '../../actions/userActions';
import { userIdSelector } from '../../selectors/userSelectors';
import Login from '../Login';
import LoggedIn from './LoggedIn';

const debug = Debug('book:modules:app');

export default function App() {
    const dispatch = useDispatch();
    const userId = useSelector(userIdSelector);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            debug('User state changed: ', user && user.toJSON());
            dispatch(userActions.setUserId(user ? user.toJSON().uid : null));
        }, function(error) {
            debug('User state change error: ', error);
            console.error(error);
        });
    }, []);

    // useEffect(() => {
    //     if(!userId) {
    //         debug('Logging user in');
    //         firebase.auth().signInWithEmailAndPassword('riffmaker@gmail.com', 'aaaaaa')
    //             .then(() => {
    //                 debug('User logged in');
    //             })
    //             .catch((error) => {
    //                 debug('User login error');
    //                 console.error(error);
    //             });
    //     }
    // }, [userId]);

    return (
        <React.Fragment>
            <CssBaseline />

            {!userId && <Login />}
            {userId && <LoggedIn />}
        </React.Fragment>
    );
}