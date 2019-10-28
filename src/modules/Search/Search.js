// @flow
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ArrowBack from '@material-ui/icons/ArrowBack';
import translateActions from '../../actions/translateActions';
import { listSelector } from '../../selectors/wordSelectors';
import { hasTranslationsSelector } from '../../selectors/translationSelectors';
import SearchInput from './SearchInput';
import SearchSuggestion from './SearchSuggestion';

const useStyles = makeStyles({
    form: {
        display: 'flex'
    },
    container: {
        position: 'relative',
        flexGrow: 1
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    suggestion: {
        background: '#efefef'
    },
});

export default function Search() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const hasTranslations = useSelector(hasTranslationsSelector);
    const words = useSelector(listSelector);
    const [word, setWord] = useState('');
    const [suggestions, setSuggestions] = useState(['car', 'card', 'care']);

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

    const handleSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(words.filter(word => word.toLowerCase().indexOf(value.toLowerCase()) === 0));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleSuggestionSelected = (e, { suggestionValue }) => {
        setWord(suggestionValue);
    };

    const getSuggestionValue = (suggestion) => suggestion;

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(translateActions.translate(word.toLowerCase()));

        if(inputRef.current) {
            inputRef.current.setSelectionRange(0, inputRef.current.value.length);
        }
    };

    return (
        <Box my={2}>
            <form className={classes.form} onSubmit={onSubmit}>
                {hasTranslations &&
                    <IconButton onClick={onBackClick}>
                        <ArrowBack />
                    </IconButton>
                }

                <Autosuggest
                    renderInputComponent={SearchInput}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={handleSuggestionsClearRequested}
                    onSuggestionSelected={handleSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={SearchSuggestion}
                    inputProps={{
                        inputRef,
                        classes,
                        id: 'react-autosuggest-simple',
                        label: 'Search',
                        placeholder: 'Search',
                        value: word,
                        onChange: handleChange,
                        onClearClick: onClearClick
                    }}
                    renderSuggestionsContainer={options => (
                        <Paper {...options.containerProps} square>
                            {options.children}
                        </Paper>
                    )}
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                    }}
                />
            </form>
        </Box>
    );
}