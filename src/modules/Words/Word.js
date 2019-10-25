// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeEntitySelector } from '../../selectors/wordSelectors';
// import Translations from './Translations';
import Translations from '../Translations/Translations';

const useStyles = makeStyles({
    detail: {
        flexWrap: 'wrap'
    },
    controls: {
        flex: '0 0 100%',
        justifyContent: 'flex-end'
    }
});

type Props = $ReadOnly<{
    wordId: string,
    active: boolean,
    onChange: (wordId: string, isActive: boolean) => void
}>;

export default function Word({ wordId, active, onChange }: Props) {
    const classes = useStyles();
    const word = useSelector(makeEntitySelector(wordId));

    const handleChange = (e, isExpanded) => onChange(wordId, isExpanded);

    return (
        <ExpansionPanel expanded={active} onChange={handleChange}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography>{word.word}</Typography>
            </ExpansionPanelSummary>
            {word.translations &&
                <ExpansionPanelDetails className={classes.detail}>
                    {/*<div className={classes.controls}>*/}
                    {/*    <IconButton>*/}
                    {/*        <DeleteIcon />*/}
                    {/*    </IconButton>*/}
                    {/*</div>*/}
                    <Translations translations={word.translations}/>
                </ExpansionPanelDetails>
            }
        </ExpansionPanel>
    );
}