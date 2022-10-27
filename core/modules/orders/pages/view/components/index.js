/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/orders/pages/view/components/style';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { moneyFormat } from '@helper_currency';
import OrderAccountInformation from '@modules/orders/pages/view/components/OrderAccountInformation';
import BillingShippingAddress from '@modules/orders/pages/view/components/BillingShippingAddress';
import StatusHistory from '@modules/orders/pages/view/components/StatusHistory';

const orderViewContent = (props) => {
    const {
        data,
    } = props;
    const classes = useStyles();
    const orderStatusHistory = (data && data.orderDetail.stateHistories) || [];
    const dataAddress = {
        name: data?.orderDetail.recipient.name || '-',
        email: data?.orderDetail.recipient.email || '-',
        street: data?.orderDetail.recipient.street || '-',
        district: data?.orderDetail.recipient.district || '-',
        subDistrict: data?.orderDetail.recipient.subDistrict || '-',
        city: data?.orderDetail.recipient.city || '-',
        province: data?.orderDetail.recipient.province || '-',
        postalCode: data?.orderDetail.recipient.postalCode || '-',
        country: data?.orderDetail.recipient.country || '-',
        mobile: data?.orderDetail.recipient.mobile || '-',
        phone: data?.orderDetail.recipient.phone || '-',
        additionalInfo: {
            address2: data?.orderDetail.recipient.additionalInfo.address2 || '-',
        },
    };
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    return (
        <>
            {/* <h2 className={classes.titleTop}>{`${t('allshipment:Detail_Shipment_')} #${shipmentDetail.shipmentId}`}</h2> */}
            <Paper className={classes.container}>
                <OrderAccountInformation data={data} />
                <BillingShippingAddress
                    data={data}
                    props={props}
                    dataAddress={dataAddress}
                />
                <h2> Items Ordered</h2>
                <div className={classes.content}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>SKU Product</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>QTY</StyledTableCell>
                                    <StyledTableCell style={{ textAlign: 'center' }}>Unit Price</StyledTableCell>
                                    <StyledTableCell>Discount Amount</StyledTableCell>
                                    <StyledTableCell>Location Code</StyledTableCell>
                                    <StyledTableCell>Replacement For</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {data?.orderDetail.items.map((row) => (
                                    <>
                                        <StyledTableRow>
                                            <StyledTableCell component="th" scope="row">
                                                {row.sku || '-'}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.name}</StyledTableCell>
                                            <StyledTableCell>{row.qty || '-'}</StyledTableCell>
                                            <StyledTableCell style={{ textAlign: 'center' }}>
                                                {moneyFormat(row.price.amount, row.price.currencyCode) || '-'}
                                            </StyledTableCell>
                                            <StyledTableCell>-</StyledTableCell>
                                            <StyledTableCell>{row.location_code || '-'}</StyledTableCell>
                                            <StyledTableCell>{row.replacement_for || '-'}</StyledTableCell>
                                        </StyledTableRow>
                                        {row.components ? (
                                            row.components.map((detailRow) => (
                                                <StyledTableRow>
                                                    <StyledTableCell component="th" scope="row" style={{ paddingLeft: '40px' }}>
                                                        -
                                                        {' '}
                                                        {detailRow.sku || '-'}
                                                    </StyledTableCell>
                                                    <StyledTableCell>{detailRow.name || '-'}</StyledTableCell>
                                                    <StyledTableCell>{detailRow.qty || '-'}</StyledTableCell>
                                                    <StyledTableCell style={{ textAlign: 'center' }}>{moneyFormat(detailRow.price.amount, detailRow.price.currencyCode) || '-'}</StyledTableCell>
                                                    <StyledTableCell>-</StyledTableCell>
                                                    <StyledTableCell>{detailRow.location_code || '-'}</StyledTableCell>
                                                    <StyledTableCell>{detailRow.replacement_for || '-'}</StyledTableCell>
                                                </StyledTableRow>
                                            ))) : null}
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <h2> Order Total</h2>
                <div className={classes.contentHeader}>
                    <TableContainer component={Paper} style={{ marginTop: 20 }}>
                        {data ? (
                            <Table aria-label="collapsible table">
                                {/* <StyledTableRow>
                                    <StyledTableCell>Tax</StyledTableCell>
                                    <StyledTableCell>-</StyledTableCell>
                                </StyledTableRow> */}
                                <StyledTableRow>
                                    <StyledTableCell>Total</StyledTableCell>
                                    <StyledTableCell>{moneyFormat(data?.orderDetail.items[0].totalPrice.amount, data?.orderDetail.items[0].totalPrice.currencyCode) || '-'}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell>Shipping Cost</StyledTableCell>
                                    <StyledTableCell>{moneyFormat(data?.orderDetail.shipments[0].fee.amount, data?.orderDetail.shipments[0].fee.currencyCode) || '-'}</StyledTableCell>
                                </StyledTableRow>
                                {/* <StyledTableRow>
                                    <StyledTableCell>GrandTotal</StyledTableCell>
                                    <StyledTableCell>{moneyFormat(data?.orderDetail.items[0].totalPrice.amount, data?.orderDetail.items[0].totalPrice.currencyCode) || '-'}</StyledTableCell>
                                </StyledTableRow> */}
                            </Table>
                        ) : null}
                    </TableContainer>
                </div>
                <h2> Status History</h2>
                <StatusHistory data={orderStatusHistory} />
            </Paper>
        </>
    );
};

export default orderViewContent;
