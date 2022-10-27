import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Layout from '@layout';
import gqlService from '@sellermodules/income/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        Content, t, banks, refetch, refetchBank, minBalance,
    } = props;

    const [isValid, setIsValid] = React.useState(false);
    const [saveSellerBankAccount] = gqlService.saveSellerBankAccount();
    const [deleteSellerBankAccount] = gqlService.deleteSellerBankAccount();
    const [createVendorIrisPayout] = gqlService.createVendorIrisPayout();
    const [isBankAccountValid] = gqlService.isBankAccountValid();
    const [getVendorIrisBankList, getVendorIrisBankListRes] = gqlService.getVendorIrisBankList();

    const formikBank = useFormik({
        initialValues: {
            account_number: '',
            bank_code: null,
            name: '',
            alias_name: '',
        },
        validationSchema: Yup.object().shape({
            account_number: Yup.string().required(t('sellerincome:This_is_a_Required_field'))
                .min(6, t('sellerincome:This_field_must_be_at_least_min_characters', { min: 6 }))
                .max(20, t('sellerincome:This_field_must_be_at_most_max_characters', { max: 20 })),
            bank_code: Yup.object().typeError(t('sellerincome:This_is_a_Required_field')).required(t('sellerincome:This_is_a_Required_field')),
            name: isValid && Yup.string().required(t('sellerincome:This_is_a_Required_field')),
            alias_name: isValid && Yup.string().required(t('sellerincome:This_is_a_Required_field'))
                .matches(/^[A-Za-z0-9]+$/, t('sellerincome:Only_alphanumeric_are_allowed_for_this_field'))
                .max(20, t('sellerincome:This_field_must_be_at_most_max_characters', { max: 20 })),
        }),
        onSubmit: (values, { resetForm }) => {
            if (isValid) {
                window.backdropLoader(true);
                saveSellerBankAccount({
                    variables: { input: { ...values, account_number: String(values.account_number), bank_code: values.bank_code.bank_code } },
                }).then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('sellerincome:Bank_acount_has_been_saved'),
                        variant: 'success',
                    });
                    setIsValid(false);
                    resetForm();
                }).catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
            } else {
                window.backdropLoader(true);
                isBankAccountValid({
                    variables: { account_number: String(values.account_number), bank_code: values.bank_code.bank_code },
                }).then((res) => {
                    if (res.data.isBankAccountValid) {
                        window.backdropLoader(false);
                        setIsValid(true);
                        window.toastMessage({
                            open: true,
                            text: t('sellerincome:Bank_account_is_valid'),
                            variant: 'success',
                        });
                    } else {
                        throw Error(t('sellerincome:Bank_account_is_not_valid'));
                    }
                }).catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
            }
        },
    });

    const formikWithdraw = useFormik({
        initialValues: {
            amount: '',
            beneficiary_id: banks?.[0]?.entity_id || null,
        },
        validationSchema: Yup.object().shape({
            amount: Yup.number().required(t('sellerincome:This_is_a_Required_field'))
                .min(Number(minBalance), t('sellerincome:This_field_must_be_at_least_min', { min: `Rp ${minBalance}` })),
            beneficiary_id: Yup.number().typeError(t('sellerincome:This_is_a_Required_field')).required(t('sellerincome:This_is_a_Required_field')),
        }),
        onSubmit: (values, { resetForm }) => {
            window.backdropLoader(true);
            createVendorIrisPayout({ variables: { input: { ...values, amount: String(values.amount) } } })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: t('sellerincome:Withdrawal_success'),
                        variant: 'success',
                    });
                    refetch();
                    resetForm();
                }).catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: e.message,
                        variant: 'error',
                    });
                });
        },
    });

    const handleDeleteBank = (id) => {
        window.backdropLoader(true);
        deleteSellerBankAccount({ variables: { id } })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: t('sellerincome:Withdrawal_success'),
                    variant: 'success',
                });
                refetchBank();
                formikWithdraw.setFieldValue('beneficiary_id', null);
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };
    const contentProps = {
        ...props,
        formikBank,
        formikWithdraw,
        getVendorIrisBankList,
        getVendorIrisBankListRes,
        isValid,
        setIsValid,
        handleDeleteBank,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('sellerincome:Balance_Withdrawal'),
    };

    const {
        data, loading, error, refetch,
    } = gqlService.getVendorIrisBalance();
    const {
        data: dataBank, loading: loadingBank, error: errorBank, refetch: refetchBank,
    } = gqlService.getSellerBankAccounts();
    const { loading: loadBalance, data: dataBalance } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/iris/minimum_payout',
    });

    React.useEffect(() => {
        BackdropLoad(loading || loadingBank || loadBalance);
    }, [loading, loadingBank, loadBalance]);

    if (loading || loadingBank) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data || errorBank) {
        const errMsg = (error?.message || errorBank?.message) ?? t('sellerincome:Data_not_found');
        const redirect = '/seller/income';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    const contentProps = {
        ...props,
        balance: data.getVendorIrisBalance,
        banks: dataBank.getSellerBankAccounts,
        minBalance: dataBalance.getStoreConfig,
        loading,
        t,
        refetch,
        refetchBank,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper {...contentProps} />
        </Layout>
    );
};

export default Core;
