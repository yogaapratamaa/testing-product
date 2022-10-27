/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable-line no-console */
/* eslint-disable max-len */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/orders/pages/view/components/style';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import formatDate from '@helper_date';
import Button from '@common_button';
import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import clsx from 'clsx';
import TableHead from '@material-ui/core/TableHead';
import { moneyFormat } from '@helper_currency';
import TableBody from '@material-ui/core/TableBody';
import { useRouter } from 'next/router';

const NewRequestReturn = (props) => {
    const {
        data,
        dataSubsidiary,
        loading,
        formikValidateItem,
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

    const return_type = [{
        id: 1,
        title: 'Replace',
    }, {
        id: 2,
        title: 'Refund',
    }];

    const location = [{
        id: 1,
        title: 'Replace',
    }, {
        id: 2,
        title: 'Refund',
    }];

    const router = useRouter();

    if (loading) {
        return (
            <div>
                Loading
            </div>
        );
    }

    return (
        <>
            <form onSubmit={(e) => formikValidateItem.handleSubmit(e)}>
                <div className={classes.contentHeader}>
                    <div>
                        <h2> Order Details</h2>
                        <h4> Select Return Type*</h4>
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <Autocomplete
                                    value={formikValidateItem.values.return_type}
                                    onChange={(newValue) => {
                                        formikValidateItem.setFieldValue('return_type', newValue);
                                    }}
                                    error={!!(formikValidateItem.touched.return_type && formikValidateItem.errors.return_type)}
                                    helperText={(formikValidateItem.touched.return_type && formikValidateItem.errors.return_type) || ''}
                                    options={return_type}
                                    primaryKey="id"
                                    labelKey="title"
                                />
                            </div>
                        </div>
                        <h4> Select Subsidiary*</h4>
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <Autocomplete
                                    value={formikValidateItem.values.subsidiary}
                                    onChange={(newValue) => {
                                        formikValidateItem.setFieldValue('subsidiary', newValue);
                                    }}
                                    error={!!(formikValidateItem.touched.subsidiary && formikValidateItem.errors.subsidiary)}
                                    helperText={(formikValidateItem.touched.subsidiary && formikValidateItem.errors.subsidiary) || ''}
                                    options={dataSubsidiary?.subsidiaryLookup}
                                    primaryKey="id"
                                    labelKey="name"
                                />
                            </div>
                        </div>
                        <h4> Location*</h4>
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <Autocomplete
                                    value={formikValidateItem.values.location}
                                    onChange={(newValue) => {
                                        formikValidateItem.setFieldValue('location', newValue);
                                    }}
                                    error={!!(formikValidateItem.touched.location && formikValidateItem.errors.location)}
                                    helperText={(formikValidateItem.touched.location && formikValidateItem.errors.location) || ''}
                                    options={location}
                                    primaryKey="id"
                                    labelKey="title"
                                />
                            </div>
                        </div>
                        <h4> Return Comments*</h4>
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.textField)}>
                                <TextField
                                    style={{ width: '100%' }}
                                    id=""
                                    variant="outlined"
                                    multiline
                                    rows={6}
                                    placeholder="Search"
                                />
                            </div>
                        </div>

                    </div>
                    <div className="grid-child">
                        <h3>
                            Order Information
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
                                    <StyledTableCell>Order Status</StyledTableCell>
                                    <StyledTableCell align="right">{data?.orderDetail.additionalInfo.channelOrderStatus || '-'}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell>Order Number</StyledTableCell>
                                    <StyledTableCell align="right">{data?.orderDetail.additionalInfo.channelOrderNumber || '-'}</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell>Channel Name</StyledTableCell>
                                    <StyledTableCell align="right">{data?.orderDetail.additionalInfo.channelOrderReference || '-'}</StyledTableCell>
                                </StyledTableRow>
                            </Table>
                        </TableContainer>
                        <div className="grid-child">
                            <h3>
                                Account Information
                            </h3>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <StyledTableRow>
                                        <StyledTableCell>Customer Name</StyledTableCell>
                                        <StyledTableCell align="right">{data?.orderDetail.recipient.name || '-'}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell>Email</StyledTableCell>
                                        <StyledTableCell align="right">{data?.orderDetail.recipient.email || '-'}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell>Customer Group</StyledTableCell>
                                        <StyledTableCell align="right">{data?.orderDetail.channelId || '-'}</StyledTableCell>
                                    </StyledTableRow>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 style={{
                        marginTop: '50px',
                    }}
                    >
                        Delivered items needs to return for order

                    </h3>
                    <TableContainer
                        style={{
                            display: 'flex', width: '100%', marginTop: '10px', marginBottom: '20px',
                        }}
                    >
                        <Table
                            style={{
                                width: '100%', marginTop: '10px', marginBottom: '20px',
                            }}
                        >
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Product Name</StyledTableCell>
                                    <StyledTableCell>SKU</StyledTableCell>
                                    <StyledTableCell>Quantity Order</StyledTableCell>
                                    <StyledTableCell>Quantity Retur*</StyledTableCell>
                                    <StyledTableCell>Return Reason</StyledTableCell>
                                    <StyledTableCell>Product Price</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {data?.orderDetail?.items.map((items, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>
                                            {items?.name || '-'}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {items?.sku || '-'}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <TextField
                                                variant="outlined"
                                                name="qty"
                                                size="small"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <TextField
                                                variant="outlined"
                                                name="quantity_retur"
                                                size="small"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <TextField
                                                variant="outlined"
                                                name="return_reason"
                                                size="small"
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {moneyFormat(data?.orderDetail.items[0].totalPrice.amount, data?.orderDetail.items[0].totalPrice.currencyCode) || '-'}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Button
                    style={{ display: 'flex', width: '75%', margin: 'auto', backgroundColor: '#000' }}
                    button
                    type="submit"
                    className={classes.buttonSubmit}
                >
                    Submit Retur
                </Button>
            </form>
        </>
    );
};
export default NewRequestReturn;
