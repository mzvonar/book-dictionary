// @flow
import React from 'react';
import Translation from './Translation';

type Props = $ReadOnly<{
    translations: $ReadOnlyArray<string>
}>;

export default function Translations({ translations }: Props) {
    return (
        <div>
            {translations && translations.map((translation) => <Translation key={translation} translation={translation} />)}
        </div>
    );
}