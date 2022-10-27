import React from 'react';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import useStyles from '@modules/orders/pages/view/components/style';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import formatDate from '@helper_date';

const OrderAccountInformation = (props) => {
    const {
        data,
    } = props;
    const classes = useStyles();

    const orderStatus = (data && data.orderDetail.state) || '';
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

    const getClassByStatus = (status) => {
        if (status.toLowerCase() === 'new') {
            return classes.statusNew;
        }
        if (status.toLowerCase() === 'processing') {
            return classes.statusProcessing;
        }
        if (status.toLowerCase() === 'ready_to_ship') {
            return classes.statusReady;
        }
        if (status.toLowerCase() === 'shipped') {
            return classes.statusShipped;
        }
        if (status.toLowerCase() === 'failed') {
            return classes.statusFailed;
        }
        if (status.toLowerCase() === 'cancelled' || status.toLowerCase() === 'rejected') {
            return classes.statusCancelled;
        }
        if (status.toLowerCase() === 'partially_delivered' || status.toLowerCase() === 'delivered') {
            return classes.statusDelivered;
        }
        return classes.statusNotFound;
    };

    return (
        <>
            <h2> Order & Account Information</h2>
            <div className={classes.contentHeader}>
                <div className="grid-child">
                    <h3>
                        Order
                        {' '}
                        {data ? `#${data?.orderDetail.additionalInfo.channelOrderReference}` : '###'}
                        {/* {' '}
                        (The Order confirmation email is not sent) */}
                    </h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <StyledTableRow>
                                <StyledTableCell>Order Date</StyledTableCell>
                                <StyledTableCell align="right">
                                    {formatDate(data?.orderDetail.createdAt, 'dddd, MMMM DD, YYYY h:mm A') || '-'}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                >
                                    <span className={getClassByStatus(orderStatus)}>{orderStatus.split('_').join(' ') || '-'}</span>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Channel Order Number</StyledTableCell>
                                <StyledTableCell align="right">{data?.orderDetail.additionalInfo.channelOrderNumber || '-'}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Channel Name</StyledTableCell>
                                <StyledTableCell align="right">{data?.orderDetail.channelId || '-'}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>MP Warehouse</StyledTableCell>
                                <StyledTableCell align="right">{data?.orderDetail.additionalInfo.remoteWarehouseId || '-'}</StyledTableCell>
                            </StyledTableRow>
                        </Table>
                    </TableContainer>
                </div>
                <div className="grid-child">
                    <h3>
                        Account Information
                    </h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <StyledTableRow>
                                <StyledTableCell>Customer Name</StyledTableCell>
                                <StyledTableCell align="right">
                                    {data?.orderDetail.recipient.name || '-'}
                                    {/* {orderDetail.lastname} */}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell align="right">{data?.orderDetail.recipient.email || '-'}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Customer Group</StyledTableCell>
                                <StyledTableCell align="right">{data?.orderDetail.customer_group || '-'}</StyledTableCell>
                            </StyledTableRow>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
};

export default OrderAccountInformation;
