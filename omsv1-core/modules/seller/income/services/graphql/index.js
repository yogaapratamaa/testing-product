import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/income/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerBalanceHistory = (variables) => useLazyQuery(Schema.getSellerBalanceHistory, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerWithdrawalHistory = (variables) => useLazyQuery(Schema.getSellerWithdrawalHistory, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getVendorIrisBalance = (variables) => useQuery(Schema.getVendorIrisBalance, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getVendorIrisBankList = (variables) => useLazyQuery(Schema.getVendorIrisBankList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveSellerBankAccount = (variables) => useMutation(Schema.saveSellerBankAccount, {
    variables,
    ...context,
});

export const deleteSellerBankAccount = (variables) => useMutation(Schema.deleteSellerBankAccount, {
    variables,
    ...context,
});

export const createVendorIrisPayout = (variables) => useMutation(Schema.createVendorIrisPayout, {
    variables,
    ...context,
});

export const isBankAccountValid = (variables) => useMutation(Schema.isBankAccountValid, {
    variables,
    ...context,
});

export const getSellerBankAccounts = (variables) => useQuery(Schema.getSellerBankAccounts, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getSellerBalanceHistory,
    getSellerWithdrawalHistory,
    getVendorIrisBalance,
    getVendorIrisBankList,
    saveSellerBankAccount,
    deleteSellerBankAccount,
    createVendorIrisPayout,
    isBankAccountValid,
    getSellerBankAccounts,
};
