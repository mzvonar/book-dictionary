// @flow
import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from '../../services/firebase';
import firestore from '../../services/firestore';
import { userIdSelector } from '../../selectors/userSelectors';
import { booksSelector, bookSelector } from '../../selectors/bookSelectors';
import BookSelect from './BookSelect';
import NewBook from '../NewBook';

const selectBook = (userId, bookId) => {
    return firestore.collection('/users').doc(userId).update({
        activeBook: bookId
    });
};

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    }
});

type Props = $ReadOnly<{
    onMenuClick: () => void
}>;

export default function TopBar({ onMenuClick }: Props) {
    const classes = useStyles();
    const [creating, setCreating] = useState();
    const userId = useSelector(userIdSelector);
    const books = useSelector(booksSelector);
    const book = useSelector(bookSelector);

    const logout = () => {
        firebase.auth().signOut().catch(console.error);
    };

    const onBookChange = (e) => {
        if(userId) {
            selectBook(userId, e.target.value);
        }
    };

    const showCreateNew = () => setCreating(true);
    const closeCreateNew = () => setCreating(false);

    const onNewBook = (bookId: string) => {
        selectBook(userId, bookId);
    };

    const sortedBooks = useMemo(() => {
        const sortedBooks = [].concat(books);
        sortedBooks.sort((a, b) => {
            if(a.name < b.name){
                return -1;
            }
            if(a.name > b.name){
                return 1;
            }

            return 0;
        });

        return sortedBooks;
    }, [books]);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
                    <MenuIcon />
                </IconButton>

                <div className={classes.title}>
                    <BookSelect
                        value={book}
                        books={sortedBooks}
                        onChange={onBookChange}
                        onCreateNew={showCreateNew}
                    />
                </div>

                {creating &&
                    <NewBook
                        userId={userId}
                        onCreate={onNewBook}
                        onClose={closeCreateNew}
                    />
                }

                {userId && <Button color="inherit" onClick={logout}>Logout</Button>}
            </Toolbar>
        </AppBar>
    );
}