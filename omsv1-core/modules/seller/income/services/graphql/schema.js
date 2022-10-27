import { gql } from '@apollo/client';

export const getSellerBalanceHistory = gql`
    query getSellerBalanceHistory(
        $pageSize: Int,
        $currentPage: Int,
        $filter: SellerBalanceHistoryFilterInput,
        $sort: SellerBalanceHistorySortInput,
        $search: String
    ){
        getSellerBalanceHistory(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
            search: $search,
        ){
          items {
            amount
            created_at
            id
            order_number
            platform_service_fee
            transaction_amount
        }
        total_count
        page_info {
            page_size
            current_page
            total_pages
        }
        }
    }
`;

export const getSellerWithdrawalHistory = gql`
    query getSellerWithdrawalHistory(
        $pageSize: Int,
        $currentPage: Int,
        $filter: SellerWithdrawalHistoryFilterInput,
        $sort: SellerWithdrawalHistorySortInput,
        $search: String
    ){
        getSellerWithdrawalHistory(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
            search: $search,
        ){
          items {
            amount
            beneficiary_id
            created_at
            entity_id
            no_reference
            notes
            status
            account_number
        }
        total_count
        page_info {
            page_size
            current_page
            total_pages
        }
        }
    }
`;

export const getVendorIrisBalance = gql`
  {
    getVendorIrisBalance
  }
`;

export const getVendorIrisBankList = gql`
  {
    getVendorIrisBankList {
      bank_code
      bank_name
    }
  }
`;

export const saveSellerBankAccount = gql`
  mutation saveSellerBankAccount($input: InputSellerBankAccount) {
    saveSellerBankAccount(input: $input) {
      account_number
      bank_code
      entity_id
      name
    }
  }
`;

export const deleteSellerBankAccount = gql`
  mutation deleteSellerBankAccount($id: Int!) {
    deleteSellerBankAccount(id: $id)
  }
`;

export const createVendorIrisPayout = gql`
  mutation createVendorIrisPayout($input: IrisPayoutInput!) {
    createVendorIrisPayout(input: $input)
  }
`;

export const isBankAccountValid = gql`
  mutation isBankAccountValid($bank_code: String, $account_number: String) {
    isBankAccountValid(bank_code: $bank_code, account_number: $account_number)
  }
`;

export const getSellerBankAccounts = gql`
{
  getSellerBankAccounts {
    account_number
    alias_name
    bank_code
    bank_name
    bank_logo
    entity_id
    name
  }
}
`;

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
