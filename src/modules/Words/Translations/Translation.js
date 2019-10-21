// @flow
import React from 'react';

type Props = $ReadOnly<{
    translation: string
}>;

export default function Translation({ translation }: Props) {
    return (
        <div>
            {translation}
        </div>
    );
}