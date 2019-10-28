// @flow
import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter9Icon from '@material-ui/icons/Filter9';
import { userIdSelector, configSelector } from '../../selectors/userSelectors';
import firestore from '../../services/firestore';


const useStyles = makeStyles({
    inactive: {
        border: '1px solid rgba(0, 0, 0, 0.26) !important',
        color: 'rgba(0, 0, 0, 0.26) !important'
    }
});

type Props = $ReadOnly<{
    sort: $ReadOnly<{
        by: 'count' | 'title',
        order: 'asc' | 'desc'
    }>
}>;

export default function Filter({ sort }: Props) {
    const classes = useStyles();
    const userId = useSelector(userIdSelector);
    const config = useSelector(configSelector);

    const handleSortChange = (by) => (e) => {
        firestore.collection('users').doc(userId).update({
            config: {
                ...config,
                sort: {
                    by: by,
                    order: sort.by === by ? (sort.order === 'asc' ? 'desc' : 'asc') : (by === 'count' ? 'desc' : 'asc')
                }
            }
        });
    };

    return (
        <Box mb={1}>
            <ButtonGroup size="small" aria-label="small outlined button group">
                <Button className={classnames({[classes.inactive]: sort.by !== 'count'})} onClick={handleSortChange('count')}>
                    {sort.by !== 'count' || sort.order === 'desc' ?
                        <Filter9Icon />
                        :
                        <Filter1Icon />
                    }
                </Button>
                <Button className={classnames({[classes.inactive]: sort.by !== 'title'})} onClick={handleSortChange('title')}>
                    {sort.by !== 'title' || sort.order === 'asc' ?
                        'A-Z'
                        :
                        'Z-A'
                    }
                </Button>
            </ButtonGroup>
        </Box>
    );
}