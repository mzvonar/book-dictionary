// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { bookSelector } from '../../selectors/bookSelectors';

export default function TopBar() {
    const book = useSelector(bookSelector);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>

                {book &&
                    <Typography variant="h6">
                        {book.name}
                    </Typography>
                }

                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
}