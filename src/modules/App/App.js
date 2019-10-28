// @flow
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debug from 'debug';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from '../../services/firebase';
import userActions from '../../actions/userActions';
import { userInitializedSelector, userIdSelector } from '../../selectors/userSelectors';
import Login from '../Login';
import LoggedIn from './LoggedIn';

const debug = Debug('book:modules:app');

const useStyles = makeStyles({
    spinner: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
});

export default function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userInitialized = useSelector(userInitializedSelector);
    const userId = useSelector(userIdSelector);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            debug('User state changed: ', user && user.toJSON());
            dispatch(userActions.setInitialized(true));
            dispatch(userActions.setUserId(user ? user.toJSON().uid : null));
        }, function(error) {
            debug('User state change error: ', error);
            console.error(error);
        });
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />

            {!userInitialized && <div className={classes.spinner}><CircularProgress /></div> }
            {userInitialized && !userId && <Login />}
            {userId && <LoggedIn />}
        </React.Fragment>
    );
}