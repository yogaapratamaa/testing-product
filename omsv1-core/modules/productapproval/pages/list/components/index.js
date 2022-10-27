/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productapproval/pages/list/components/Header';
import gqlService from '@modules/productapproval/services/graphql';
import Autocomplete from '@common_autocomplete';

const ProductApprovalListContent = (props) => {
    const { data, loading, getVendorProductApprovalList, productsApprove, t } = props;
    const productList = (data && data.getVendorProductApprovalList && data.getVendorProductApprovalList.items) || [];
    const productTotal = (data && data.getVendorProductApprovalList && data.getVendorProductApprovalList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('productapproval:ID'), sortable: true, hideable: true },
        { field: 'approval_status', headerName: t('productapproval:Approval_status'), hideable: true },
        { field: 'sku', headerName: t('productapproval:SKU'), sortable: true, hideable: true },
        { field: 'name', headerName: t('productapproval:Product_Name'), sortable: true, hideable: true },
        { field: 'vendor_name', headerName: t('productapproval:Vendor'), sortable: true, hideable: true },
        { field: 'price', headerName: t('productapproval:Price'), hideable: true },
        { field: 'special_price', headerName: t('productapproval:Special_Price'), hideable: true },
        { field: 'special_from_date', headerName: t('productapproval:Special_Price_From'), hideable: true, hidden: true },
        { field: 'special_to_date', headerName: t('productapproval:Special_Price_To'), hideable: true, hidden: true },
        { field: 'status', headerName: t('productapproval:Status'), sortable: true, hideable: true },
    ];

    const rows = productList.map((product) => ({
        ...product,
        id: product.entity_id,
        approval_status: product.approval_status === '1' ? t('productapproval:Approve') : t('productapproval:Not_Approve'),
    }));

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: t('productapproval:ID_From'), initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: t('productapproval:ID_To'), initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: t('productapproval:SKU'), initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: t('productapproval:Product_Name'), initialValue: '' },
        {
            field: 'vendor_id',
            name: 'vendor_id',
            type: 'eq',
            label: t('productapproval:Vendor'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getCompanyList, getCompanyListRes] = gqlService.getCompanyList({
                    variables: { pageSize: 0, currentPage: 1 },
                });
                const statusOptions = (getCompanyListRes
                    && getCompanyListRes.data
                    && getCompanyListRes.data.getCompanyList
                    && getCompanyListRes.data.getCompanyList.items) || [];
                const primaryKey = 'company_code';
                const labelKey = 'company_name';
                return (
                    <Autocomplete
                        mode="lazy"
                        getOptions={getCompanyList}
                        value={statusOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={statusOptions}
                        primaryKey={primaryKey}
                        loading={getCompanyListRes.loading}
                        labelKey={labelKey}
                    />
                );
            },
        }];

    const actions = [
        {
            label: t('productapproval:Approve'),
            message: t('productapproval:Are_you_sure_to_confirm_'),
            onClick: async (checkedRows) => {
                const variables = { ids: checkedRows.map((checkedRow) => checkedRow.id) };
                await productsApprove({ variables });
            },
            showMessage: true,
        },
    ];

    return (
        <>
            <Header t={t} />
            <Table
                rows={rows}
                getRows={getVendorProductApprovalList}
                loading={loading}
                columns={columns}
                count={productTotal}
                filters={filters}
                actions={actions}
                showCheckbox
            />
        </>
    );
};

export default ProductApprovalListContent;
