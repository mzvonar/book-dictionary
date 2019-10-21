// @flow
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';
import translateActions from '../../actions/translateActions';
import { hasTranslationsSelector } from '../../selectors/translationSelectors';

const useStyles = makeStyles({
    form: {
        display: 'flex'
    },
    search: {
        flexGrow: 1
    }
});

export default function Search() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const hasTranslations = useSelector(hasTranslationsSelector);
    const [word, setWord] = useState('car');

    const handleChange = (e) => setWord(e.target.value);

    const onBackClick = () => {
        setWord('');
        dispatch(translateActions.setTranslations(null));
    };

    const onClearClick = () => {
        setWord('');

        if(inputRef.current) {
            inputRef.current.focus();
        }

        dispatch(translateActions.setTranslations(null));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(translateActions.translate(word));
    };

    return (
        <Box my={2}>
            <form className={classes.form} onSubmit={onSubmit}>
                {hasTranslations &&
                    <IconButton onClick={onBackClick}>
                        <ArrowBack />
                    </IconButton>
                }
                <TextField
                    className={classes.search}
                    id="search"
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Search"
                    value={word}
                    inputRef={inputRef}
                    onChange={handleChange}
                    InputProps={{
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
                        ),
                    }}
                />
            </form>
        </Box>
    );
}