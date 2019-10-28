// @flow
import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';

function SearchSuggestion(suggestion, { isHighlighted }) {
    return (
        <MenuItem selected={isHighlighted} component="div">
            {suggestion}
        </MenuItem>
    );
}

export default SearchSuggestion;