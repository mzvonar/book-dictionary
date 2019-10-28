// @flow
import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';


function SearchInput(inputProps) {
    const { classes, inputRef = () => {}, ref, onClearClick, ...other } = inputProps;

    return (
        <TextField
            type="text"
            variant="outlined"
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            aria-label="Clear search"
                            onClick={onClearClick}
                        >
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
            {...other}
        />
    );
}

export default SearchInput;