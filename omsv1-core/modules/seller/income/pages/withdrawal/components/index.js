import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import TextField from '@common_textfield';
import Button from '@common_button';

import Card from '@sellermodules/income/pages/withdrawal/components/Card';
import Form from '@sellermodules/income/pages/withdrawal/components/BankForm';
import { formatNumber } from '@helper_currency';
import useStyles from '@sellermodules/income/pages/withdrawal/components/style';

const IncomeWithdrawalContent = (props) => {
    const {
        balance, formikWithdraw, t, banks,
        handleDeleteBank, minBalance,
    } = props;
    const router = useRouter();
    const classes = useStyles();
    const [expand, setExpand] = React.useState(false);

    return (
        <>
            <div className={classes.headerContainer}>
                <div className="left">
                    <IconButton aria-label="back" onClick={() => router.push('/seller/income/balance')}>
                        <ArrowBackOutlinedIcon />
                    </IconButton>
                    <h2 className="title">{t('sellerorder:Income_Page')}</h2>
                </div>
            </div>
            <Paper className={classes.container}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.title}>
                            {t('sellerincome:Balance_Withdrawal')}
                        </div>
                        <div className={clsx(classes.flexContainer, 'between', 'border')}>
                            <div className={clsx(classes.subtitle, 'primary')}>
                                {t('sellerincome:Income_Balance')}
                            </div>
                            <div className={clsx(classes.subtitle, 'primary')}>
                                {balance}
                            </div>
                        </div>
                        <div className={clsx(classes.flexContainer, 'between')}>
                            <span className={classes.label}>
                                {t('sellerincome:Withdrawal_Amount')}
                            </span>
                            <span
                                aria-hidden="true"
                                className={classes.label}
                                style={{ cursor: 'pointer' }}
                                onClick={() => formikWithdraw.setFieldValue('amount', Number(formatNumber(balance, 'IDR')))}
                            >
                                {t('sellerincome:Withdrawal_All')}
                            </span>
                        </div>
                        <div style={{ margin: '10px 0' }}>
                            <TextField
                                id="amount"
                                name="amount"
                                value={formikWithdraw.values.amount}
                                onChange={(e) => {
                                    let temp = e.target.value;
                                    if (temp > Number(formatNumber(balance, 'IDR'))) {
                                        temp = Number(formatNumber(balance, 'IDR'));
                                    }
                                    formikWithdraw.setFieldValue('amount', temp);
                                }}
                                className={clsx(classes.textInput, 'adorn')}
                                type="number"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment className={classes.adornment} position="start">
                                            Rp
                                        </InputAdornment>
                                    ),
                                    inputProps: { max: Number(balance) },
                                }}
                                error={!!(formikWithdraw.touched.amount && formikWithdraw.errors.amount)}
                                helperText={(formikWithdraw.touched.amount && formikWithdraw.errors.amount) || ''}
                            />
                        </div>
                        <div className={clsx(classes.text, 'no-icon')}>
                            {t('sellerincome:Minimum_withdrawal_amount_is_IDR_min', { min: minBalance })}
                        </div>
                        <div style={{ height: 40 }} />
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <Button className={clsx(classes.btn, 'big')} onClick={formikWithdraw.handleSubmit}>
                                    {t('sellerincome:Withdraw_Balance')}
                                </Button>
                            </Grid>
                        </Grid>
                        {!!formikWithdraw.touched.beneficiary_id && !!formikWithdraw.errors.beneficiary_id
                            && (
                                <div className={classes.errorText}>
                                    {t("sellerincome:Please_Choose_your_bank_Account_If_you_didn't_have_one_please_add_your_bank_account")}
                                </div>
                            )}
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <div className={classes.title}>
                            {t('sellerincome:Bank_Account')}
                        </div>
                        {!!banks?.length
                            && (
                                <div className={classes.bankAccountContainer}>
                                    <FormControl className={classes.formControl}>
                                        <RadioGroup aria-label="position" name="position" defaultValue="top">
                                            {banks.map((account) => (
                                                <Card
                                                    {...account}
                                                    formik={formikWithdraw}
                                                    handleDeleteBank={handleDeleteBank}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            )}
                        <div className={classes.flexContainer} style={{ cursor: 'pointer' }} onClick={() => setExpand(!expand)} aria-hidden="true">
                            <div className={clsx(classes.addIcon, expand && 'expand')}>
                                <span />
                                <span />
                            </div>
                            <div className={classes.label}>
                                {t('sellerincome:Add_Account')}
                            </div>
                        </div>
                        <div style={{ height: 20 }} />
                        <Collapse in={expand}>
                            <Form {...props} />
                        </Collapse>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default IncomeWithdrawalContent;
