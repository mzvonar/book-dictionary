// @flow
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import firestore from '../../services/firestore';
import Spinner from '../ui/Spinner';

const useStyles = makeStyles(theme => ({
    dialog: {
        minWidth: 300
    },
    error: {
        backgroundColor: theme.palette.error.dark,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

type Props = $ReadOnly<{
    userId: string,

    onClose: () => void,
    onCreate: (bookId: string) => void
}>;

export default function NewBook({ userId, onClose, onCreate }: Props) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [nameMissingError, setNameMissingError] = useState();

    const handleChange = (e) => {
        if(nameMissingError) {
            setNameMissingError(false);
        }
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name) {
            setNameMissingError(true);
            return;
        }

        setIsLoading(true);
        firestore.collection(`/users/${userId}/books`).add({
            name: name
        })
            .then((ref) => {
                onCreate(ref.id);
                onClose();
            })
            .catch(e => {
                console.error('Create book error', e);
                setIsLoading(false);
                setError(true);
            });
    };

    return (
        <Dialog
            className={classes.dialog}
            open={true}
            aria-labelledby="form-dialog-title"
            onClose={onClose}
        >
            <DialogTitle id="form-dialog-title">
                <FormattedMessage
                    id="newBook.heading"
                    defaultMessage="Create new book"
                />
            </DialogTitle>

            <form onSubmit={handleSubmit} noValidate>
                <DialogContent>
                    <Spinner isLoading={isLoading}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            value={name}
                            type="text"
                            error={nameMissingError}
                            required
                            fullWidth
                            onChange={handleChange}
                        />

                        {error &&
                            <SnackbarContent
                                className={classes.error}
                                message={
                                    <span>
                                    <FormattedMessage
                                        id="newBook.error"
                                        defaultMessage="There was an error"
                                    />
                                </span>
                                }
                            />
                        }
                    </Spinner>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        <FormattedMessage
                            id="Cancel"
                            defaultMessage="cancel"
                        />
                    </Button>
                    <Button type="submit" color="primary">
                        <FormattedMessage
                            id="newBook.createCTA"
                            defaultMessage="Create"
                        />
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}