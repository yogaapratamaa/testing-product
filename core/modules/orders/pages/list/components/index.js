/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
// import gqlService from '@modules/orders/services/graphql';
import useStyles from '@modules/orders/pages/list/components/style';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Header from '@modules/orders/pages/list/components/Header';
import formatDate from '@helper_date';
import { optionsStatus } from '@modules/orders/helpers';

const OrderContentList = (props) => {
    const {
        data,
        dataOrderSearch,
        getOrderSearch,
        loadingOrderSearch,
        loading,
        errorSearch,
        setErrorSearch,
        dataChannelStoreName,
        loadingChannelStoreName,
        // formik,
        getOrderList,
        // varExport,
        // setVarExport,
        // t,
        // pageConfig,
        setShowModal,
    } = props;
    const orderList = (data && data.orderPage && data.orderPage.items) || [];
    const orderSearch = (dataOrderSearch && dataOrderSearch.orderSearch && dataOrderSearch.orderSearch.items) || [];
    const [showFilter, setShowFilter] = React.useState(false);
    const channelStoreName = (dataChannelStoreName && dataChannelStoreName.channelStoreListFilter) || [];
    const pagePrev = (data && data.orderPage.page.prev) || '';
    const pageNext = (data && data.orderPage.page.next) || '';
    const pagePrevSearch = (dataOrderSearch && dataOrderSearch.orderSearch.page.prev) || '';
    const pageNextSearch = (dataOrderSearch && dataOrderSearch.orderSearch.page.next) || '';
    const classes = useStyles();

    const checkingFilter = () => {
        if (showFilter && orderSearch && orderSearch.length !== 0) {
            return orderSearch;
        }
        return orderList;
    };

    const rowToUsed = checkingFilter();

    const findMyStoreName = (value) => {
        const store = channelStoreName.find((element) => element.id === value);
        if (store) {
            return `${store.name} - (${store.code})`;
        }
        return value;
    };
    const handleClickRow = (event, row) => {
        if (event.target.tagName === 'TD') {
            window.open(`/orders/view/${row.id}`, '_self');
        }
    };

    const getClassByStatus = (status) => {
        if (status.toLowerCase() === 'new') {
            return classes.statusNew;
        }
        if (status.toLowerCase() === 'on_process') {
            return classes.statusProcessing;
        }
        if (status.toLowerCase() === 'ready_to_ship') {
            return classes.statusReady;
        }
        if (status.toLowerCase() === 'shipped') {
            return classes.statusShipped;
        }
        // if (status.toLowerCase() === 'failed') {
        //     return classes.statusFailed;
        // }
        if (status.toLowerCase() === 'cancelled' || status.toLowerCase() === 'rejected') {
            return classes.statusCancelled;
        }
        if (status.toLowerCase() === 'partially_delivered' || status.toLowerCase() === 'delivered') {
            return classes.statusDelivered;
        }
        if (status.toLowerCase() === 'completed') {
            return classes.statusCompleted;
        }
        return classes.statusNotFound;
    };

    const columns = [
        {
            field: 'channelOrderNumber', headerName: 'Channel Order Number', hideable: true,
        },
        {
            field: 'channelOrderReference', headerName: 'Channel Order Reference', hideable: true,
        },
        {
            field: 'channel_order_date', headerName: 'Channel Order Date', initialSort: 'DESC', hideable: true,
        },
        {
            field: 'last_updated', headerName: 'Last Updated', hideable: true,
        },
        { field: 'acceptance_deadline', headerName: 'Acceptance Deadline', hideable: true },
        { field: 'channelStoreName', headerName: 'Channel Store Name', hideable: true },
        {
            field: 'status', headerName: 'Status', hideable: true,
        },
        { field: 'remarks', headerName: 'Remarks', hideable: true },
        { field: 'action', headerName: 'Action' },
        { field: 'action2', headerName: '' },
    ];

    const rows = rowToUsed.map((row) => ({
        ...row,
        channelOrderNumber: row.additionalInfo.channelOrderNumber,
        channelOrderReference: row.additionalInfo.channelOrderReference,
        channel_order_date: formatDate(row.orderedAt, 'MMM DD, YYYY h:mm'),
        last_updated: formatDate(row.updatedAt, 'MMM DD, YYYY h:mm'),
        // acceptance_deadline: formatDate(row.updatedAt, 'YYYY-MM-DD h:mm:ss'),
        channelStoreName: findMyStoreName(row.storeId),
        status: () => (
            <div className={getClassByStatus(row.state)}>
                {row.state}
            </div>
        ),
        remarks: row.buyerNote,
        action: () => (
            <Link href={`/orders/view/${row.id}`}>
                <a className={classes.linkButton}>View</a>
            </Link>
        ),
        action2: () => (
            <Link href={`/orders/edit/${row.id}`}>
                <a className={classes.linkButton}>Edit</a>
            </Link>
        ),
    }));

    const filters = [
        // {
        //     field: 'channel_order_date',
        //     name: 'channel_order_date',
        //     type: 'from',
        //     label: 'Channel Order Date',
        //     initialValue: '',
        //     component: ({ filterValue, setFilterValue }) => (
        //         <TextField
        //             variant="outlined"
        //             id="date"
        //             type="date"
        //             value={filterValue?.split(' ').slice(0, 1).join('')}
        //             className={classes.textField}
        //             InputLabelProps={{
        //                 shrink: true,
        //             }}
        //             onChange={(newValue) => {
        //                 newValue.target.value ? setFilterValue(`${newValue.target.value} 00:00:00`)
        //                     : setFilterValue(`${newValue.target.value}`);
        //             }}
        //             InputProps={{
        //                 className: classes.fieldInput,
        //             }}
        //         />
        //     ),
        // },
        {
            field: 'dateFrom',
            name: 'channel_order_date_from',
            type: 'from',
            label: 'Channel Order Date From',
            // initialValue: formik.values.dateTo,
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    // label="from"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.TextField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        // eslint-disable-next-line no-unused-expressions
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
            field: 'dateTo',
            name: 'channel_order_date_to',
            type: 'to',
            label: 'Channel Order Date To',
            // initialValue: formik.values.dateTo,
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
                    // label="to"
                    id="date"
                    type="date"
                    value={filterValue?.split(' ').slice(0, 1).join('')}
                    className={classes.TextField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => {
                        // eslint-disable-next-line no-unused-expressions
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
            field: 'channelOrderNumber',
            name: 'channel_order_number',
            type: 'like',
            label: 'Channel Order Number ',
            initialValue: '',
        },
        {
            field: 'channelOrderReference',
            name: 'channel_order_reference',
            type: 'like',
            label: 'Channel Order Reference',
            initialValue: '',
        },
        {
            field: 'channelStoreName', name: 'channel_name', type: 'like', label: 'Channel Store Name', initialValue: '',
        },
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const options = optionsStatus.slice().map((item) => ({
                    name: item.name,
                    id: item.id,
                }));
                return (
                    <Autocomplete
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={options}
                    />
                );
            },
        },
        {
            field: 'remarks', name: 'remarks', label: 'Remarks', type: 'like', initialValue: '',
        },

    ];
    const handleExport = (e) => {
        // eslint-disable-next-line no-console
        console.log(e, 'handleExport');
    };
    const handleImport = () => {
        // eslint-disable-next-line no-console
        setShowModal(true);
    };
    return (
        <div className={classes.orderContainer}>
            <Header props={props} />
            <Table
                // rows={errorSearch ? null : rows}
                rows={rows}
                getRows={getOrderList}
                getRowsFilter={getOrderSearch}
                filters={filters}
                handleExport={handleExport}
                handleImport={handleImport}
                hideColumns
                // actions={actions}
                showCheckbox
                setShowFilter={setShowFilter}
                showFilter={showFilter}
                loading={(loading && loadingChannelStoreName) || loadingOrderSearch}
                errorSearch={errorSearch}
                setErrorSearch={setErrorSearch}
                // loading={loading && loadingChannelStoreName}
                columns={columns}
                // handleReset={handleReset}
                pagePrev={showFilter ? pagePrevSearch : pagePrev}
                pageNext={showFilter ? pageNextSearch : pageNext}
                handleClickRow={handleClickRow}
            />
        </div>
    );
};

export default OrderContentList;
