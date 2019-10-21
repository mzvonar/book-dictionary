// @flow
import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

type Props = $ReadOnly<{
    translation: string
}>;

export default function Translation({ translation }: Props) {
    return (
        <TableRow>
            <TableCell>
                {translation}
            </TableCell>
        </TableRow>
    );
}