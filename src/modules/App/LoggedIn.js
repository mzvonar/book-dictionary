// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import { hasTranslationsSelector } from '../../selectors/translationSelectors';
import Sync from '../Sync';
import TopBar from '../TopBar';
import Search from '../Search';
import Translations from '../Translations';
import Words from '../Words';

export default function LoggedIn() {
    const hasTranslations = useSelector(hasTranslationsSelector);

    return (
        <React.Fragment>
            <Sync />

            <TopBar />
            <Container>
                <Search />
                <Translations />
                {!hasTranslations && <Words />}
            </Container>
        </React.Fragment>
    );
}