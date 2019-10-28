// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeEntitySelector } from '../../selectors/wordSelectors';
// import Translations from './Translations';
import ConfirmDialog from '../ui/ConfirmDialog';
import ExternalTranslations from '../ExternalTranslations';
import Translations from '../Translations/Translations';

const useStyles = makeStyles(theme => ({
    detail: {
        flexWrap: 'wrap'
    },
    controls: {
        flex: '0 0 100%',
        justifyContent: 'flex-end'
    },
    deleteButton: {
        color: theme.palette.error.dark
    }
}));

type Props = $ReadOnly<{
    wordId: string,
    active: boolean,
    onChange: (wordId: string, isActive: boolean) => void,
    onDelete: (wordId: string) => void
}>;

export default function Word({ wordId, active, onChange, onDelete }: Props) {
    const classes = useStyles();
    const word = useSelector(makeEntitySelector(wordId));

    const handleChange = (e, isExpanded) => onChange(wordId, isExpanded);

    const handleDelete = () => onDelete(wordId);

    return (
        <ExpansionPanel expanded={active} onChange={handleChange}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography>{word.word}</Typography>
            </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.detail}>
                    <ExternalTranslations word={wordId} />

                    {word.translations &&
                        <Translations translations={word.translations}/>
                    }
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Box px={1}>
                        <ConfirmDialog
                            title={(
                                <FormattedMessage
                                    id="word.deleteDialog.title"
                                    defaultMessage="Are you sure you want to delete this word?"
                                />
                            )}
                            onConfirm={handleDelete}
                        >
                            {(openDialog) => (
                                <IconButton size="small" className={classes.deleteButton} onClick={openDialog}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </ConfirmDialog>
                    </Box>
                </ExpansionPanelActions>
        </ExpansionPanel>
    );
}