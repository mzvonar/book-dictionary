// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from '../../services/firebase';
import { userIdSelector } from '../../selectors/userSelectors';
import { bookSelector } from '../../selectors/bookSelectors';

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    }
});

export default function TopBar() {
    const classes = useStyles();
    const userId = useSelector(userIdSelector);
    const book = useSelector(bookSelector);

    const logout = () => {
        firebase.auth().signOut().catch(console.error);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>

                {book &&
                    <Typography variant="h6" className={classes.title}>
                        {book.name}
                    </Typography>
                }

                {userId && <Button color="inherit" onClick={logout}>Logout</Button>}
            </Toolbar>
        </AppBar>
    );
}