import * as React from 'react';
import Button from '@common_button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@common_formdialog/style';
import { useTranslation } from '@i18n';

const FormDialog = (props) => {
    const { t } = useTranslation(['common']);
    const {
        labelButton = t('common:View'),
        classButton = 'btnFormDialog',
        titleDialog,
        message,
        onClick,
        open,
        setOpen,
    } = props;
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
        if (onClick) {
            onClick();
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} className={classButton}>
                {labelButton}
            </Button>
            <Dialog open={open} onClose={handleClose} className={classes.wrapperDialog}>
                <DialogTitle>
                    {titleDialog}
                    <IconButton className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {message}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FormDialog;
