// @flow
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import translateActions from '../../actions/translateActions';

export default function Search() {
    const dispatch = useDispatch();
    const [word, setWord] = useState('car');

    const handleChange = (e) => setWord(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(translateActions.translate(word));
    };

    return (
        <form onSubmit={onSubmit}>
            <TextField
                id="search"
                variant="outlined"
                type="text"
                label="Search"
                value={word}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                aria-label="Clear search"
                                // onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                            >
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
}