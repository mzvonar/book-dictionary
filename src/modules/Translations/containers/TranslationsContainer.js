// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import { translationsSelector } from '../../../selectors/translationSelectors';
import Translations from '../Translations';

export default function TranslationsContainer() {
    const translations = useSelector(translationsSelector);

    return (
        <Translations translations={translations} />
    );
}