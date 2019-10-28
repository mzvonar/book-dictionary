// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { userIdSelector, configSelector } from '../../selectors/userSelectors';
import firestore from '../../services/firestore';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    root: {
        width: drawerWidth
    },
    drawerHeader: {
        ...theme.mixins.toolbar,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));

type Props = $ReadOnly<{
    open: boolean,

    onClose: () => void
}>;

function Menu({ open, onClose }: Props) {
    const classes = useStyles();
    const userId = useSelector(userIdSelector);
    const config = useSelector(configSelector);
    const provider = config && config.provider;

    const handleProviderChange = (e) => {
        firestore.collection('users').doc(userId).update({
            config: {
                ...config,
                provider: e.target.value
            }
        });
    };

    return (
        <Drawer
            className={classes.root}
            classes={{
                paper: classes.drawerPaper,
            }}
            open={open}
            onClose={onClose}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={onClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />

            <List>
                <ListItem button>
                    <ListItemText>
                        <FormControl>
                            <InputLabel htmlFor="age-simple">
                                <FormattedMessage
                                    id="menu.provider"
                                    defaultMessage="Provider"
                                />
                            </InputLabel>
                            <Select
                                value={provider}
                                onChange={handleProviderChange}
                                inputProps={{
                                    name: 'provider',
                                    id: 'provider',
                                }}
                            >
                                <MenuItem value="google">Google</MenuItem>
                                <MenuItem value="microsoft">Microsoft</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItemText>
                </ListItem>
            </List>
        </Drawer>
    );
}

export default Menu;