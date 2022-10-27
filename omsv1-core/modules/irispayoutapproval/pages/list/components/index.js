/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import Table from '@common_table';
import Header from '@modules/irispayoutapproval/pages/list/components/Header';
import useStyles from '@modules/locationpriceupload/pages/list/components/style';
import TextField from '@common_textfield';
import dynamic from 'next/dynamic';
import BalanceModal from '@modules/irispayoutapproval/pages/list/components/balancemodal';

const Message = dynamic(() => import('@common_toast'), { ssr: false });

const VendorIrisPayoutApprovalContent = (props) => {
    const classes = useStyles();
    const { data, loading, getVendorIrisPayoutApprovalList, vendorIrisPayoutApprove, vendorIrisPayoutReject, t,
        show, setShow } = props;
    const irisPayoutApprovalList = (data && data.getVendorIrisPayoutApprovalList && data.getVendorIrisPayoutApprovalList.items) || [];
    const irisPayoutTotal = (data && data.getVendorIrisPayoutApprovalList && data.getVendorIrisPayoutApprovalList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: t('irispayoutapproval:ID'), sortable: true, initialSort: 'ASC', hideable: true },
        { field: 'created_at', headerName: t('irispayoutapproval:Created_At'), sortable: true, hideable: true },
        { field: 'updated_at', headerName: t('irispayoutapproval:Updated_At'), hideable: true },
        { field: 'beneficiary_id', headerName: t('irispayoutapproval:Beneficiary_Id'), hideable: true },
        { field: 'no_reference', headerName: t('irispayoutapproval:No_Reference'), hideable: true },
        { field: 'vendor_id', headerName: t('irispayoutapproval:Vendor_Id'), hideable: true },
        { field: 'amount', headerName: t('irispayoutapproval:Amount'), hideable: true },
        { field: 'notes', headerName: t('irispayoutapproval:Notes'), hideable: true },
        { field: 'status', headerName: t('irispayoutapproval:Status'), hideable: true },
    ];

    const filters = [
        { field: 'amount', name: 'amount_from', type: 'from', label: t('irispayoutapproval:Amount_From'), initialValue: '' },
        { field: 'amount', name: 'amount_to', type: 'to', label: t('irispayoutapproval:Amount_To'), initialValue: '' },
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: t('irispayoutapproval:Created_At_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: t('irispayoutapproval:Created_At_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'updated_at',
            name: 'updated_at_from',
            type: 'from',
            label: t('irispayoutapproval:Updated_At_From'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'updated_at',
            name: 'updated_at_to',
            type: 'to',
            label: t('irispayoutapproval:Updated_At_To'),
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        newValue.target.value ? setFilterValue(`${newValue.target.value} 23:59:59`)
                            : setFilterValue(`${newValue.target.value}`);
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'no_reference', name: 'no_reference', type: 'like', label: t('irispayoutapproval:No_Reference'), initialValue: '' },
        { field: 'beneficiary_id', name: 'beneficiary_id', type: 'like', label: t('irispayoutapproval:Beneficiary_Id'), initialValue: '' },
        { field: 'vendor_id', name: 'vendor_id', type: 'like', label: t('irispayoutapproval:Vendor_Id'), initialValue: '' },
        { field: 'notes', name: 'notes', type: 'like', label: t('irispayoutapproval:Notes'), initialValue: '' },
        { field: 'status', name: 'status', type: 'like', label: t('irispayoutapproval:Status'), initialValue: '' },
    ];

    const rows = irisPayoutApprovalList.map((irisPayout) => ({
        ...irisPayout,
        id: irisPayout.entity_id,
    }));

    const [toastMessage, setToastMessage] = useState({
        open: false,
        variant: '',
        text: '',
        htmlMessage: '',
    });

    const handleCloseMessage = () => {
        setToastMessage({ ...toastMessage, open: false });
    };

    return (
        <>
            <Header {...props} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getVendorIrisPayoutApprovalList}
                // deleteRows={vendorIrisPayoutReject}
                loading={loading}
                columns={columns}
                count={irisPayoutTotal}
                showCheckbox
                recordName="iris payout approval"
                actions={[
                    {
                        label: t('irispayoutapproval:Approve'),
                        message: t('irispayoutapproval:Are_you_sure_you_want_to_approve'),
                        onClick: async (_checkedRows) => {
                            window.backdropLoader(true);
                            try {
                                const variables = { ids: _checkedRows.map((checkedRow) => Number(checkedRow.id)) };
                                const res = await vendorIrisPayoutApprove({ variables });
                                if (res && res.data && res.data.vendorIrisPayoutApprove && res.data.vendorIrisPayoutApprove.error) {
                                    throw new Error(res.data.vendorIrisPayoutApprove.message);
                                }
                                window.toastMessage({
                                    open: true,
                                    text: t('irispayoutapproval:Are_you_sure_you_want_to_approve'),
                                    variant: 'success',
                                });
                            } catch (e) {
                                setToastMessage({
                                    open: true,
                                    text: '',
                                    variant: 'error',
                                    htmlMessage: e.message,
                                });
                            }
                            window.backdropLoader(false);
                        },
                    },
                    {
                        label: t('irispayoutapproval:Reject'),
                        message: t('irispayoutapproval:Are_you_sure_you_want_to_Reject'),
                        onClick: async (_checkedRows) => {
                            window.backdropLoader(true);
                            try {
                                const variables = { ids: _checkedRows.map((checkedRow) => Number(checkedRow.id)) };
                                const res = await vendorIrisPayoutReject({ variables });
                                if (res && res.data && res.data.vendorIrisPayoutReject && res.data.vendorIrisPayoutReject.error) {
                                    throw new Error(res.data.vendorIrisPayoutReject.message);
                                }
                                window.toastMessage({
                                    open: true,
                                    text: t('irispayoutapproval:Reject_success'),
                                    variant: 'success',
                                });
                            } catch (e) {
                                setToastMessage({
                                    open: true,
                                    text: '',
                                    variant: 'error',
                                    htmlMessage: e.message,
                                });
                            }
                            window.backdropLoader(false);
                        },
                    },
                ]}
            />
            <Message
                open={toastMessage.open}
                variant={toastMessage.variant}
                setOpen={handleCloseMessage}
                message={toastMessage.text}
                htmlMessage={toastMessage.htmlMessage}
                autoHideDuration={5000}
            />
            {show
            && (
                <BalanceModal
                    open={show}
                    handleClose={() => setShow(false)}
                    handleOpen={() => setShow(true)}
                    t={t}
                />
            )}
        </>
    );
};

export default VendorIrisPayoutApprovalContent;
