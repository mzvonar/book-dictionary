// @flow
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import type { Books, Book } from '../../types';

const useStyles = makeStyles({
    formControl: {
        minWidth: 200
    },
    label: {
        minWidth: '200px'
    }
});

type Props = $ReadOnly<{
    value: Book,
    books: Books,

    onChange: (e: SyntheticEvent) => void,
    onCreateNew: () => void
}>;

export default function BookSelect({ value, books, onChange, onCreateNew }: Props) {
    const classes = useStyles();
    const [open, setOpen] = useState();

    const handleChange = (e) => {
        if(e.target.value === '') {
            onCreateNew();
        }
        else {
            onChange(e);
        }
    };

    const onOpen = () => setOpen(true);
    const onClose = () => setTimeout(() => setOpen(false));

    return (
        <FormControl variant="outlined" margin="dense" className={classes.formControl}>
            <Select
                value={value ? value.id : ''}
                displayEmpty
                inputProps={{
                    name: 'book',
                    id: 'book',
                }}
                onChange={handleChange}
                onOpen={onOpen}
                onClose={onClose}
            >
                <MenuItem value="">
                    <em>
                        {open ?
                            <FormattedMessage
                                id="bookSelect.createNewBook"
                                defaultMessage="Create new book"
                            />
                            :
                            <FormattedMessage
                                id="bookSelect.selectBook"
                                defaultMessage="Select book"
                            />
                        }
                    </em>
                </MenuItem>

                {books.map(book => (
                    <MenuItem key={book.id} value={book.id}>{book.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}