// @flow
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Translation from './Translation';

export default function Translations({ translations }) {
    return (
        <Table>
            <TableBody>
                {translations && translations.map((translation, index) => <Translation key={index} translation={translation} />)}
            </TableBody>
        </Table>
    );
}