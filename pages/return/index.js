import Page from '@modules/return/pages/list';

export default Page;

// import React from 'react';
// import Table from '@common_table';
// import useStyles from '@modules/shipment/pages/list/components/style';
// import Link from 'next/link';
// import Button from '@common_button';
// import { useRouter } from 'next/router';

// const ReturnContentList = () => {
//     const [indexType, setIndexType] = React.useState({
//         allocation_status: 0,
//     });
//     const [tab, setTab] = React.useState(0);
//     const returnTotal = 5;
//     const classes = useStyles();
//     const router = useRouter();

//     const optionsStatus = [
//         { id: 'new', name: 'new' },
//         { id: 'pick_in_progress', name: 'Pick in Progress' },
//         { id: 'pick_uncomplete', name: 'Pick Uncomplete' },
//         { id: 'sorting_in_progress', name: 'Sorting in Progress' },
//         { id: 'pick_complete', name: 'Pick Complete' },
//     ];

//     const columns = [
//         {
//             field: 'rma_number', headerName: 'RMA Number', hideable: true,
//         },
//         {
//             field: 'customer_name', headerName: 'Customer Name', hideable: true,
//         },
//         {
//             field: 'marketplace_order_number', headerName: 'Marketplace Order Number', hideable: true,
//         },
//         {
//             field: 'return_status', headerName: 'Return Status', hideable: true,
//         },
//         {
//             field: 'return_type', headerName: 'Return Type', hideable: true,
//         },
//         { field: 'qty_order', headerName: 'Qty Order', hideable: true },
//         {
//             field: 'qty_return', headerName: 'Qty Return', hideable: true,
//         },
//         {
//             field: 'so_number', headerName: 'SO Number', hideable: true,
//         },
//         { field: 'remarks', headerName: 'Remarks', hideable: true },
//         { field: 'action', headerName: 'Action' },
//     ];

//     const sampleRow = [
//         {
//             rma_number: 'RMA012093120',
//             customer_name: 'Bella Nadhifah',
//             marketplace_order_number: '220821P66JBVCD',
//             return_status: 'Pending',
//             return_type: 'PACKED',
//             qty_order: 1,
//             qty_return: 1,
//             so_number: '0102929e020',
//             remarks: 'Cacat produksi',
//             action: 'Cancel View Set',
//         },
//         {
//             rma_number: 'RMA012093123',
//             customer_name: 'Eko Fahrudi',
//             marketplace_order_number: '220821P66JBVCD',
//             return_status: 'Pending',
//             return_type: 'PACKED',
//             qty_order: 2,
//             qty_return: 2,
//             so_number: '0102929e020',
//             remarks: 'Lebih Kirim',
//             action: 'Cancel View Set',
//         },
//     ];

//     const rows = sampleRow.map((row) => ({
//         ...row,
//         rma_number: row.rma_number,
//         action: () => (
//             <Link href={`/return/edit/${row.shipment_number}`}>
//                 <a className={classes.linkButton}>Cancel & Edit</a>
//             </Link>
//         ),
//     }));

//     return (
//         <>
//             <h2 className={classes.title}>Return</h2>

//             <Button
//                 className={classes.buttonAdd}
//                 buttonType="secondary"
//                 onClick={() => router.push('/order/fetchorder')}
//             >
//                 New Return Request
//             </Button>
//             <Table
//                 hideActions
//                 hideColumns
//                 searchable
//                 rows={rows}
//                 showCheckbox
//                 columns={columns}
//                 count={shipmentTotal}
//                 handleReset={() => setTab(0)}
//                 indexType={indexType}
//             />
//         </>
//     );
// };

// export default ReturnContentList;
