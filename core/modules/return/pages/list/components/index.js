/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import useStyles from '@modules/return/pages/list/components/style';
import Header from '@modules/return/pages/list/components/Header';

const ReturnContentList = (props) => {
    const {
        data,
    } = props;
    const orderReadyToReturn = (data && data.orderReadyToReturn && data.orderReadyToReturn.items) || [];
    const [tab, setTab] = React.useState(0);
    const classes = useStyles();
    const [indexType] = React.useState({
        allocation_status: 0,
    });

    const columns = [
        {
            field: 'id', headerName: 'RMA Number', hideable: true,
        },
        {
            field: 'customer_name', headerName: 'Customer Name', hideable: true,
        },
        {
            field: 'marketplace_order_number', headerName: 'Marketplace Order Number', hideable: true,
        },
        {
            field: 'return_status', headerName: 'Return Status', hideable: true,
        },
        {
            field: 'return_type', headerName: 'Return Type', hideable: true,
        },
        {
            field: 'so_number', headerName: 'SO Number', hideable: true,
        },
        {
            field: 'remarks', headerName: 'Remarks', hideable: true,
        },
        {
            field: 'action', headerName: 'Action',
        },
        {
            field: 'action2', headerName: '',
        },
        {
            field: 'action3', headerName: '',
        },
    ];

    const rows = orderReadyToReturn.map((row) => ({
        ...row,
        id: row.id,
        customer_name: row.recipient.name,
        marketplace_order_number: row.additionalInfo.channelOrderNumber,
        return_status: row.additionalInfo.channelOrderStatus,
        return_type: row.additionalInfo.channelOrderStatus,
        action: () => (
            <Link href={`/return/edit/${row.rma_number}`}>
                <a className={classes.linkButton}>Cancel</a>
            </Link>
        ),
        action2: () => (
            <Link href={`/return/edit/${row.rma_number}`}>
                <a className={classes.linkButton}>View</a>
            </Link>
        ),
        action3: () => (
            <Link href={`/return/edit/${row.rma_number}`}>
                <a className={classes.linkButton}>Set</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header props={props} />
            <Table
                rows={rows}
                hideColumns
                showCheckbox
                columns={columns}
                indexType={indexType}
            />
        </>
    );
};

export default ReturnContentList;
