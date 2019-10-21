// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeEntitySelector } from '../../selectors/wordSelectors';
// import Translations from './Translations';
import Translations from '../Translations/Translations';

type Props = $ReadOnly<{
    wordId: string,
    active: boolean,
    onChange: (wordId: string, isActive: boolean) => void
}>;

export default function Word({ wordId, active, onChange }: Props) {
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
                <ExpansionPanelDetails>
                    <Translations translations={word.translations}/>
                </ExpansionPanelDetails>
            }
        </ExpansionPanel>
    );
}