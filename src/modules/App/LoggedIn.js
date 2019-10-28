// @flow
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import { wordSelector, hasTranslationsSelector } from '../../selectors/translationSelectors';
import Sync from '../Sync';
import TopBar from '../TopBar';
import Menu from '../Menu';
import Search from '../Search';
import ExternalTranslations from '../ExternalTranslations';
import Translations from '../Translations';
import Words from '../Words';

export default function LoggedIn() {
    const [menuOpen, setMenuOpen] = useState(false);
    const word = useSelector(wordSelector);
    const hasTranslations = useSelector(hasTranslationsSelector);

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => setMenuOpen(false);

    return (
        <React.Fragment>
            <Sync />

            <TopBar onMenuClick={openMenu} />
            <Menu open={menuOpen} onClose={closeMenu}/>
            <Container>
                <Search />

                <ExternalTranslations word={word} />
                <Translations />
                {!hasTranslations && <Words />}
            </Container>
        </React.Fragment>
    );
}