import React from 'react';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import useStyles from '@modules/return/pages/view/components/style';
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
            <h2> Return Information</h2>
            <div className={classes.contentHeader}>
                <div className="grid-child">
                    <h3>
                        Order
                        {' '}
                        {data ? `#${data?.orderDetail.additionalInfo.customerReference}` : '###'}
                        {' '}
                        (The Order confirmation email is not sent)
                    </h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <StyledTableRow>
                                <StyledTableCell>Order Date</StyledTableCell>
                                <StyledTableCell align="right">
                                    {formatDate(data?.orderDetail.createdAt, 'MMM D, YYYY h:mm:ss A') || '-'}
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell align="right">{data?.orderDetail.additionalInfo.channelOrderStatus || '-'}</StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell>Channel Order ID</StyledTableCell>
                                <StyledTableCell align="right">{data?.orderDetail.additionalInfo.customerReference || '-'}</StyledTableCell>
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
                                <StyledTableCell align="right">{data?.orderDetail.email || '-'}</StyledTableCell>
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
