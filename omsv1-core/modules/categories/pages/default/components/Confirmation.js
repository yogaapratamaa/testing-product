import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@common_button';
import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_DARK } from '@theme_color';

const useStyles = makeStyles(() => ({
    title: {
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 600,
        },
    },
    text: {
        '&.MuiDialogContentText-root': {
            color: PRIMARY_DARK,
            fontSize: 14,
        },
    },
    btn: {
        '&.MuiDialogActions-root': {
            padding: 20,
        },
    },
}));

const ConfirmationDialog = (props) => {
    const {
        open = false,
        onConfirm,
        onCancel,
        nodeAct = {},
        t,
    } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            className={classes.container}
        >
            <DialogTitle className={classes.title}>{t('categories:Delete_Category')}</DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.text}>
                    {t('categories:Are_you_sure_want_to_delete_cat_category_', { cat: nodeAct?.name })}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.btn}>
                <Button onClick={onConfirm} color="primary">
                    {t('common:OK')}
                </Button>
                <Button onClick={onCancel} buttonType="outlined" color="primary" autoFocus>
                    {t('common:Cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
