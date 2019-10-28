// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    }
}));

type Props = $ReadOnly<{
    provider: string,
    from: string,
    to: string,
    word: string
}>;

function ExternalTranslation({ provider, from, to, word }: Props) {
    const classes = useStyles();

    let label;
    let url;
    if(provider === 'google') {
        label = 'Google';
        url = `https://translate.google.com/#view=home&op=translate&sl=${from}&tl=${to}&text=${word}`;
    }
    else if(provider === 'slovnik.sk') {
        label = 'Slovnik.sk';
        let localFrom;
        let localTo;
        if(from === 'en') {
            localFrom = 'anglicko';
        }
        if(to === 'sk') {
            localTo = 'slovensky';
        }

        if(!localFrom || !localTo) {
            throw new Error('Unknown languages for slovnik.sk');
        }

        url = `https://slovnik.aktuality.sk/preklad/${localFrom}-${localTo}/?q=${word}`;
    }
    else {
        throw new Error(`Unknown provider ${provider}`);
    }

    return (
        <Button
            href={url}
            target="_blank"
            variant="outlined"
            size="small"
            className={classes.button}
        >
            {label}
        </Button>
    );
}

export default ExternalTranslation;