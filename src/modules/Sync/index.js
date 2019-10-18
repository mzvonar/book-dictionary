// @flow
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import firestore from '../../services/firestore';
import bookActions from '../../actions/bookActions';

function Sync() {
    const dispatch = useDispatch();

    useEffect(() => {
        firestore.collection('books').doc('dune')
            .onSnapshot((doc) => {
                if(doc.exists) {
                    const book = doc.data();

                    dispatch(bookActions.setBook({
                        id: doc.id,
                        ...book
                    }))
                }
            })
    }, []);

    return null;
}

export default Sync;