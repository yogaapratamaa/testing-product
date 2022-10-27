/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
// import gqlService from '@modules/orders/services/graphql';
import useStyles from '@modules/return/pages/list/components/style';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
// import Button from '@common_button';
import Header from '@modules/return/pages/list/components/Header';
// import formatDate from '@helper_date';

const OrderContentList = (props) => {
    const [tab, setTab] = React.useState(0);
    const classes = useStyles();
    const returnTotal = 5;
    const [indexType] = React.useState({
        allocation_status: 0,
    });

    const columns = [
        {
            field: 'order_number', headerName: 'Order Number', hideable: true,
        },
        {
            field: 'customer_name', headerName: 'Customer Name', hideable: true,
        },
        {
            field: 'channel_order_number', headerName: 'Channel Order Number', hideable: true,
        },
        {
            field: 'marketplace_order_number', headerName: 'Marketplace Order Number', hideable: true,
        },
        {
            field: 'order_date', headerName: 'Order Date', hideable: true,
        },
        {
            field: 'order_status', headerName: 'Order Status', hideable: true,
        },
        { field: 'channel_name', headerName: 'Channel Name', hideable: true },
        {
            field: 'qty_order', headerName: 'Qty Order', hideable: true,
        },
        {
            field: 'total_price', headerName: 'Total Price', hideable: true,
        },
        { field: 'action', headerName: 'Action' },
    ];

    const sampleRow = [
        {
            order_number: '01GERPFA9M4P1STE66P8FFAZ5W',
            customer_name: 'Bella Nadhifah',
            channel_order_number: 'Testing',
            marketplace_order_number: '220821P66JBVCD',
            order_date: 'Testing',
            order_status: 'Pending',
            channel_name: 'Testing',
            qty_order: 1,
            total_price: 'Rp 10.000',
            action: 'Create',
        },
        {
            order_number: '01GERPFA9M4P1STE66P8FFAZ5WTEST',
            customer_name: 'Eko Fahrudi',
            channel_order_number: 'Testing',
            marketplace_order_number: '220821P66JBVCD',
            order_date: 'Testing',
            order_status: 'Pending',
            channel_name: 'Testing',
            qty_order: 1,
            total_price: 'Rp 10.000',
            action: 'Create',
        },
    ];

    const rows = sampleRow.map((row) => ({
        ...row,
        order_number: row.order_number,
        action: () => (
            <Link href={`/return/create/${row.order_number}`}>
                <a className={classes.linkButton}>Create</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header />
            <Table
                hideActions
                hideColumns
                hideFilters
                rows={rows}
                showCheckbox
                columns={columns}
                count={returnTotal}
                handleReset={() => setTab(0)}
                indexType={indexType}
            />
        </>
    );
};

export default OrderContentList;
