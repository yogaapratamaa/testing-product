import React from 'react';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Button from '@common_button';

import useStyles from '@sellermodules/income/pages/withdrawal/components/style';

const IncomeWithdrawalContent = (props) => {
    const {
        t, getVendorIrisBankList, getVendorIrisBankListRes, formikBank, isValid, setIsValid,
    } = props;
    const classes = useStyles();

    const onClickChange = () => {
        setIsValid(false);
        formikBank.setFieldValue('name', '');
        formikBank.setFieldValue('alias_name', '');
    };
    return (
        <>

            <div className={classes.formField}>
                <InputLabel htmlFor="bank_code" className={[classes.label, classes.required]}>
                    {t('registerseller:Bank_Name')}
                </InputLabel>
                <Autocomplete
                    mode="lazy"
                    value={formikBank.values.bank_code}
                    onChange={(e) => formikBank.setFieldValue('bank_code', e)}
                    getOptions={getVendorIrisBankList}
                    options={getVendorIrisBankListRes.data?.getVendorIrisBankList || []}
                    primaryKey="bank_code"
                    labelKey="bank_name"
                    fullWidth
                    disabled={isValid}
                    renderInput={(params) => (
                        <TextField
                            className={classes.textInput}
                            placeholder={t('sellerincome:Choose_bank_name')}
                            error={!!(formikBank.touched.bank_code && formikBank.errors.bank_code)}
                            helperText={(formikBank.touched.bank_code && formikBank.errors.bank_code) || ''}
                            inputProps={{
                                autocomplete: 'off',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                            {...params}
                        />
                    )}
                />
            </div>
            <Grid container className={classes.bankFormContainer}>
                <Grid item xs={10} sm={10}>
                    <div className={classes.formField} style={{ marginRight: 10 }}>
                        <InputLabel htmlFor="account_number" className={[classes.label, classes.required]}>
                            {t('registerseller:Account_Number')}
                        </InputLabel>
                        <TextField
                            id="account_number"
                            name="account_number"
                            type="number"
                            className={classes.textInput}
                            value={formikBank.values.account_number}
                            onChange={formikBank.handleChange}
                            error={!!(formikBank.touched.account_number && formikBank.errors.account_number)}
                            helperText={(formikBank.touched.account_number && formikBank.errors.account_number) || ''}
                            disabled={isValid}
                        />
                    </div>
                </Grid>
                <Grid item xs={2} sm={2}>
                    {isValid ? (
                        <Button className={clsx(classes.btn, 'big', 'secondary')} onClick={onClickChange}>
                            {t('sellerincome:Change')}
                        </Button>
                    )
                        : (
                            <Button className={clsx(classes.btn, 'big', 'secondary')} onClick={formikBank.handleSubmit}>
                                {t('sellerincome:Check')}
                            </Button>
                        )}
                </Grid>
            </Grid>
            {isValid
            && (
                <Grid container spacing={3} className={classes.bankFormContainer}>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.formField} style={{ marginRight: 10 }}>
                            <InputLabel htmlFor="name" className={[classes.label, classes.required]}>
                                {t('registerseller:Account_Holder_Name')}
                            </InputLabel>
                            <TextField
                                id="name"
                                name="name"
                                className={classes.textInput}
                                value={formikBank.values.name}
                                onChange={formikBank.handleChange}
                                error={!!(formikBank.touched.name && formikBank.errors.name)}
                                helperText={(formikBank.touched.name && formikBank.errors.name) || ''}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.formField} style={{ marginRight: 10 }}>
                            <InputLabel htmlFor="alias_name" className={[classes.label, classes.required]}>
                                {t('registerseller:Alias_Name')}
                            </InputLabel>
                            <TextField
                                id="alias_name"
                                name="alias_name"
                                className={classes.textInput}
                                value={formikBank.values.alias_name}
                                onChange={formikBank.handleChange}
                                error={!!(formikBank.touched.alias_name && formikBank.errors.alias_name)}
                                helperText={(formikBank.touched.alias_name && formikBank.errors.alias_name) || ''}
                            />
                        </div>
                    </Grid>
                </Grid>
            ) }
            <Grid container spacing={3} className={classes.bankFormContainer}>
                <Grid item xs={6} sm={6}>
                    <span className={clsx(classes.text, 'no-icon')}>
                        {t('sellerincome:You_can_use_the_added_bank_account_to_withdraw_your_balance')}
                    </span>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Button className={clsx(classes.btn, 'big')} disabled={!isValid} onClick={formikBank.handleSubmit}>
                        {t('sellerincome:Save')}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default IncomeWithdrawalContent;
