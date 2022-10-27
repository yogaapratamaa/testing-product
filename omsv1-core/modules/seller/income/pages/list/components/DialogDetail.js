/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from '@sellermodules/income/pages/list/components/style';

const IncomeListContent = (props) => {
    const { t, detail, setOpen, open } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            classes={{ paper: classes.dialogContainer }}
            fullWidth
        >
            <DialogTitle className={classes.dialogTitleContainer}>
                {t('sellerincome:Transaction_Details')}
                <IconButton className={classes.closeButton} onClick={() => setOpen(false)}>
                    <CloseIcon className={classes.closeIcon} />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className={clsx(classes.textDialog, 'bold')}>{t('sellerincome:Income')}</div>
                <div className={clsx(classes.textDialog, 'price')}>{detail?.amount}</div>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={clsx(classes.textDialog, 'bold')}>{t('sellerincome:Order_Number')}</div>
                        <div className={classes.textDialog}>{detail?.order_number}</div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={clsx(classes.textDialog, 'bold')}>{t('sellerincome:Transaction_Date')}</div>
                        <div className={classes.textDialog}>{detail?.created_at}</div>
                    </Grid>
                </Grid>
                <div className={classes.dialogDivider} />
            </DialogContent>
            <DialogContent>
                <div className={clsx(classes.textDialog, 'bold')}>{t('sellerincome:Income_Details')}</div>
                <Grid container style={{ marginBottom: 12 }}>
                    <Grid item xs={6}>
                        <div className={classes.textDialog}>{t('sellerincome:Transaction_Value')}</div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={clsx(classes.textDialog, 'end')}>{detail?.transaction_amount}</div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={classes.textDialog}>{t('sellerincome:Platform_Service_Fee')}</div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={clsx(classes.textDialog, 'end')}>{`-${detail?.platform_service_fee}`}</div>
                    </Grid>
                </Grid>
                <div className={classes.dialogDivider} />
            </DialogContent>
            <DialogContent>
                <Grid container style={{ marginBottom: 12 }}>
                    <Grid item xs={6}>
                        <div className={clsx(classes.textDialog, 'primary')}>{t('sellerincome:Total_Income')}</div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={clsx(classes.textDialog, 'primary', 'end')}>{detail?.amount}</div>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default IncomeListContent;
