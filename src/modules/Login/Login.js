// @flow
import React, { useState } from 'react';
import Debug from 'debug';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import firebase from '../../services/firebase';

const debug = Debug('book:modules:login');

const useStyles = makeStyles(theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
        setError(null);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        console.log('email: ', email);
        console.log('password: ', password);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                debug('User login error'. error);
                setError(true);
            });
    };

    return (
        <Container>
            <Box pt={2}>
                <Typography variant="h4" component="h4" gutterBottom>
                    Book Dictionary
                </Typography>

                <form onSubmit={onSubmit}>
                    <TextField
                        id="email"
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={handleChange(setEmail)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={handleChange(setPassword)}
                    />

                    {error &&
                        <SnackbarContent
                            className={classes.error}
                            message={
                                <span>
                                    Login error
                                </span>
                            }
                        />
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                </form>
            </Box>
        </Container>
    );
}