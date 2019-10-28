// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = $ReadOnly<{
    title?: Node,
    content?: Node,
    children: (openDialog: () => void) => Node,

    onConfirm: () => void,
    onCancel?: () => void
}>;

function ConfirmDialog({ title, content, children, onConfirm, onCancel }: Props) {
    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    const handleCancel = () => {
        closeDialog();

        if(onCancel) {
            onCancel();
        }
    };

    const handleConfirm = () => {
        closeDialog();
        onConfirm();
    };

    return (
        <React.Fragment>
            {children(openDialog)}

            <Dialog
                open={open}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {title &&
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                }
                {content &&
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {content}
                        </DialogContentText>
                    </DialogContent>
                }
                <DialogActions>
                    <Button color="default" onClick={handleCancel}>
                        <FormattedMessage
                            id="confirmDialog.cancelButton"
                            defaultMessage="Cancel"
                        />
                    </Button>
                    <Button color="secondary" onClick={handleConfirm}>
                        <FormattedMessage
                            id="confirmDialog.deleteButton"
                            defaultMessage="Delete"
                        />
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ConfirmDialog;