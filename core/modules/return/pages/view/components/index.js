/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React from 'react';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import useStyles from '@modules/orders/pages/view/components/style';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { moneyFormat } from '@helper_currency';
import OrderAccountInformation from './ReturnAccountInformation';
import BillingShippingAddress from './BillingShippingAddress';

const orderEditContent = (props) => {
    const {
        // formikNotes,
        // formikConfirm,
        // formikCantFullfill,
        // formikRellocation,
        data,
        // t,
    } = props;
    const classes = useStyles();

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
                <BillingShippingAddress data={data} />
                <h2> Items Ordered</h2>
                <div className={classes.content}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>SKU Product</StyledTableCell>
                                    <StyledTableCell>Price</StyledTableCell>
                                    {/* <StyledTableCell>Sell Price</StyledTableCell> */}
                                    <StyledTableCell>QTY</StyledTableCell>
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
                                            <StyledTableCell style={{ paddingLeft: 0 }}>
                                                {moneyFormat(row.price.amount, row.price.currencyCode) || '-'}
                                            </StyledTableCell>
                                            {/* <StyledTableCell>{row.sell_price}</StyledTableCell> */}
                                            <StyledTableCell>{row.qty || '-'}</StyledTableCell>
                                            <StyledTableCell>{row.discount_amount || '-'}</StyledTableCell>
                                            <StyledTableCell>{row.location_code || '-'}</StyledTableCell>
                                            <StyledTableCell>{row.replacement_for || '-'}</StyledTableCell>
                                        </StyledTableRow>
                                        {row.detail ? (
                                            row.detail.map((detailRow) => (
                                                <StyledTableRow>
                                                    <StyledTableCell component="th" scope="row">
                                                        -
                                                        {' '}
                                                        {detailRow.sku || '-'}
                                                    </StyledTableCell>
                                                    <StyledTableCell style={{ paddingLeft: 0 }}>{detailRow.base_price || '-'}</StyledTableCell>
                                                    {/* <StyledTableCell>{detailRow.sell_price}</StyledTableCell> */}
                                                    <StyledTableCell>{detailRow.qty || '-'}</StyledTableCell>
                                                    <StyledTableCell>{detailRow.discount_amount || '-'}</StyledTableCell>
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
                    <TableContainer component={Paper}>
                        {data ? (
                            <Table aria-label="collapsible table">
                                <StyledTableRow>
                                    <StyledTableCell>Tax</StyledTableCell>
                                    <StyledTableCell>{moneyFormat(data?.orderDetail.items[0].tax.amount, data?.orderDetail.items[0].tax.currencyCode) || '-'}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell>Total</StyledTableCell>
                                    <StyledTableCell>{moneyFormat(data?.orderDetail.items[0].totalPrice.amount, data?.orderDetail.items[0].totalPrice.currencyCode) || '-'}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell>Shipping Cost</StyledTableCell>
                                    <StyledTableCell>{moneyFormat(data?.orderDetail.shipments[0].fee.amount, data?.orderDetail.shipments[0].fee.currencyCode) || '-'}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell>GrandTotal</StyledTableCell>
                                    <StyledTableCell>{moneyFormat(data?.orderDetail.items[0].totalPrice.amount, data?.orderDetail.items[0].totalPrice.currencyCode) || '-'}</StyledTableCell>
                                </StyledTableRow>
                            </Table>
                        ) : null}
                    </TableContainer>
                </div>
            </Paper>
        </>
    );
};

export default orderEditContent;
