// @flow
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Debug from 'debug';
import firestore from '../../services/firestore';
import userActions from '../../actions/userActions';
import bookActions from '../../actions/bookActions';
import wordActions from '../../actions/wordActions';
import { userIdSelector, userSelector } from '../../selectors/userSelectors';
import { bookSelector } from '../../selectors/bookSelectors';

const debug = Debug('book:modules:sync');

function Sync() {
    const dispatch = useDispatch();
    const initWordsRef = useRef();
    const userId = useSelector(userIdSelector);
    const user = useSelector(userSelector);
    const bookId = user && user.activeBook;
    const book = useSelector(bookSelector);

    useEffect(() => {
        let unsubscribe;

        debug('UserId changed: ', userId);

        if(userId) {
            debug(`Subscribing to user data: ${userId}`);
            unsubscribe = firestore.collection('users').doc(userId)
                .onSnapshot((doc) => {
                    if(doc.exists) {
                        const user = doc.data();

                        dispatch(userActions.setUser({
                            ...user,
                            id: userId
                        }));
                    }
                })
        }

        return () => {
            if(unsubscribe) {
                debug('Unsubscribing from user data');
                unsubscribe();
            }
        }
    }, [userId]);

    useEffect(() => {
        let unsubscribe;

        if(userId) {
            const collection = `users/${userId}/books`;
            debug(`Subscribing to books collection: ${collection}`);
            unsubscribe = firestore.collection(collection)
                .onSnapshot((querySnapshot) => {
                    const books = [];
                    querySnapshot.forEach(doc => {
                        const book = {
                            name: doc.get('name'),
                            id: doc.id
                        };

                        books.push(book)
                    });

                    dispatch(bookActions.setBooks(books));
                });
        }

        return () => {
            if(unsubscribe) {
                debug('Unsubscribing from words collection');
                unsubscribe();
            }
        }
    }, [userId]);

    useEffect(() => {
        let unsubscribe;

        debug('BookId changed: ', bookId);


        const collection = `users/${userId}/books`;
        if(userId && bookId) {
            debug(`Subscribing to book data: ${collection}/${bookId}`);
            unsubscribe = firestore.collection(collection).doc(bookId)
                .onSnapshot((doc) => {
                    if(doc.exists) {
                        const book = doc.data();

                        dispatch(bookActions.setBook({
                            id: doc.id,
                            ...book
                        }))
                    }
                })
        }

        return () => {
            if(unsubscribe) {
                debug('Unsubscribing from book data');
                unsubscribe();
            }
        }
    }, [userId, bookId]);

    useEffect(() => {
        let unsubscribe;

        debug('BookId changed: ', bookId);

        if(userId && bookId) {
            const collection = `users/${userId}/books/${bookId}/words`;
            debug(`Subscribing to words collection: ${collection}`);
            unsubscribe = firestore.collection(collection)
                .onSnapshot((querySnapshot) => {
                    if(!initWordsRef.current) {
                        // Initial snapshot
                        const words = [];
                        querySnapshot.forEach(doc => {
                            words.push(doc.data());
                        });

                        dispatch(wordActions.setWords(words));
                    }
                    else {
                        querySnapshot.docChanges().forEach(change => {
                            if(change.type === 'added' || change.type === 'modified') {
                                const word = change.doc.data();
                                dispatch(wordActions.setWord(word));
                            }
                            else if(change.type === 'removed') {
                                dispatch(wordActions.unsetWord(change.doc.id));
                            }
                        });
                    }


                    initWordsRef.current = true;
                });
        }

        return () => {
            initWordsRef.current = null;
            if(unsubscribe) {
                debug('Unsubscribing from words collection');
                unsubscribe();
            }
        }
    }, [userId, bookId]);

    return null;
}

export default Sync;