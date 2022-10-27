/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Button from '@common_button';

import Table from '@sellermodules/income/pages/list/components/Table';
import DialogDetail from '@sellermodules/income/pages/list/components/DialogDetail';
import useStyles from '@sellermodules/income/pages/list/components/style';

const IncomeListContent = (props) => {
    const { getSellerBalanceHistory, getSellerWithdrawalHistory,
        data, dataWithdraw, loading, loadingWithdraw, t, balance, minBalance } = props;
    const classes = useStyles();
    const router = useRouter();
    const { history } = router.query;
    const [detail, setDetail] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const balanceList = (data && data.getSellerBalanceHistory && data.getSellerBalanceHistory.items) || [];
    const balanceTotal = (data && data.getSellerBalanceHistory && data.getSellerBalanceHistory.total_count) || 0;

    const withdrawList = (dataWithdraw && dataWithdraw.getSellerWithdrawalHistory && dataWithdraw.getSellerWithdrawalHistory.items) || [];
    const withdrawTotal = (dataWithdraw && dataWithdraw.getSellerWithdrawalHistory && dataWithdraw.getSellerWithdrawalHistory.total_count) || 0;

    const columns = [
        { field: 'created_at', headerName: t('sellerincome:Transaction_Date'), sortable: true, initialSort: 'DESC' },
        { field: 'order_number', headerName: t('sellerincome:Order_Number') },
        { field: 'amount', headerName: t('sellerincome:Amount'), sortable: true },
        { field: 'action', headerName: t('sellerincome:Action') },
    ];

    const rows = balanceList.map((b) => ({
        ...b,
        action: (
            <span className={classes.seeDetails} aria-hidden="true" onClick={() => { setOpen(true); setDetail(b); }}>
                {t('sellerincome:See_Details')}
            </span>),
    }));

    const columnsWithdraw = [
        { field: 'created_at', headerName: t('sellerincome:Transaction_Date'), sortable: true, initialSort: 'DESC' },
        { field: 'account_number', headerName: t('sellerincome:Bank_Account') },
        { field: 'amount', headerName: t('sellerincome:Amount'), sortable: true },
        { field: 'status', headerName: t('sellerincome:Status') },
    ];

    const rowsWithdraw = withdrawList.map((w) => ({
        ...w,
        status: <span style={{ textTransform: 'capitalize' }}>{w.status}</span>,
    }));

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.title}>
                    {t('sellerincome:Balance_Details')}
                </div>
                <Grid container spacing={3} className={classes.wallet}>
                    <Grid item xs={12} sm="auto">
                        <img src="/assets/img/wallet.svg" alt="wallet" />
                        <span className={clsx(classes.text, 'primary')}>{balance}</span>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Button className={classes.btn} onClick={() => router.push('/seller/income/withdrawal')}>
                            {t('sellerincome:Withdraw_Balance')}
                        </Button>
                    </Grid>
                </Grid>
                <div className={classes.subtitle}>
                    {t('sellerincome:Withdrawal_Information')}
                </div>
                <Grid container>
                    <Grid item xs={12} sm={6} className={classes.infoContainer}>
                        <img className="icon" src="/assets/img/money.svg" alt="money" />
                        <span className={classes.text}>{t('sellerincome:Minimum_withdrawal_amount_is_IDR_min', { min: minBalance })}</span>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.infoContainer}>
                        <img className="icon" src="/assets/img/time.svg" alt="time" />
                        <span className={classes.text}>{t('sellerincome:Disbursement_of_funds_will_be_processed_within_1x24_hours')}</span>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} className={clsx(classes.infoContainer, 'bottom')}>
                        <img className="icon" src="/assets/img/adminfee.svg" alt="adminfee" />
                        <span className={classes.text}>{t('sellerincome:Withdrawal_of_funds_to_Bank_BCA_will_not_be_subject_to_administration_fees_if_withdrawals_are_made_to_other_banks_an_administration_fee_of_Rp6500_will_be_charged')}</span>
                    </Grid> */}
                    <Grid item xs={12} sm={6} className={clsx(classes.infoContainer, 'bottom')}>
                        <img className="icon" src="/assets/img/cs.svg" alt="cs" />
                        <span className={classes.text}>{t('sellerincome:If_the_balance_has_not_been_entered_within_the_specified_time_please_contact_our_Customer_Service')}</span>
                    </Grid>
                </Grid>
            </Paper>

            <Table
                header={t('sellerincome:Income')}
                columns={history === 'withdraw' ? columnsWithdraw : columns}
                getRows={history === 'withdraw' ? getSellerWithdrawalHistory : getSellerBalanceHistory}
                rows={history === 'withdraw' ? rowsWithdraw : rows}
                loading={history === 'withdraw' ? loadingWithdraw : loading}
                count={history === 'withdraw' ? withdrawTotal : balanceTotal}
                searchPlaceholder={t('sellerincome:Search_for_order_number')}
                t={t}
            />
            <DialogDetail t={t} detail={detail} open={open} setOpen={setOpen} />
        </>
    );
};

export default IncomeListContent;
