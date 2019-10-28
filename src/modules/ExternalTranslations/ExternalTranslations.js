// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { configSelector } from '../../selectors/userSelectors';
import { bookSelector } from '../../selectors/bookSelectors';
import ExternalTranslation from './ExternalTranslation';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    }
});

type Props = $ReadOnly<{
    word: string
}>;

function ExternalTranslations({ word }: Props) {
    const classes = useStyles();
    const config = useSelector(configSelector);
    const book = useSelector(bookSelector);

    if(!word || !book) {
        return null;
    }

    const from = book.language || 'en';
    const to = config.to || 'sk';

    return (
        <div className={classes.root}>
            <ExternalTranslation provider="google" from={from} to={to} word={word} />
            <ExternalTranslation provider="slovnik.sk" from={from} to={to} word={word} />
        </div>
    )
}

export default ExternalTranslations;