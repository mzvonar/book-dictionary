// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import { translationsSelector } from '../../selectors/translationSelectors';
import Translation from './Translation';

export default function Translations() {
    const translations = useSelector(translationsSelector);

    return (
        <div>
            {translations && translations.map((translation, index) => <Translation key={index} translation={translation} />)}
        </div>
    );
}