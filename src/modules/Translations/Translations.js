// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { translationsSelector } from '../../selectors/translationSelectors';
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