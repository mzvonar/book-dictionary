// @flow
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../services/firebase';
import userActions from '../../actions/userActions';
import { userSelector } from '../../selectors/userSelectors';
import Sync from '../Sync';
import TopBar from '../TopBar';
import Search from '../Search';
import Translations from '../Translations';

export default function App() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            dispatch(userActions.setUser(user ? user.toJSON() : null));
        }, function(error) {
            console.error(error);
        });

        firebase.auth().signInWithEmailAndPassword('riffmaker@gmail.com', 'aaaaaa')
            .then(() => {
                console.log('User logged in');
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {user && <Sync />}

            {/*<TopBar />*/}
            <Search />
            <Translations />
        </div>
    );
}