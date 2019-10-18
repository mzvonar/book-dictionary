// @flow
import React from 'react';

type Props = $ReadOnly<{
    translation: $ReadOnly<{

    }>
}>;

export default function Translation({ translation }: Props) {


    return (
        <div>
            {translation.translatedText}
        </div>
    );
}