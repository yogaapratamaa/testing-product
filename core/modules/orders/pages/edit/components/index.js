/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React, { useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import useStyles from '@modules/orders/pages/edit/components/style';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import OrderAccountInformation from '@modules/orders/pages/view/components/OrderAccountInformation';
import BillingShippingAddress from '@modules/orders/pages/view/components/BillingShippingAddress';
import Button from '@common_button';
import TextField from '@common_textfield';
import { moneyFormat } from '@helper_currency';
import StatusHistory from '@modules/orders/pages/view/components/StatusHistory';

const orderEditContent = (props) => {
    const {
        formikValidateItem,
        handleEditItem,
        dataItem,
        setDataItem,
        // loading,
        data,
        dataValidation,
    // t,
    } = props;
    const classes = useStyles();
    const dataOriginal = (data && data.orderDetail) || {};
    const validationItem = (dataValidation && dataValidation.validateEditItem) || {};
    const orderStatusHistory = (data && data.orderDetail.stateHistories) || [];
    const dataAdded = formikValidateItem.values;
    const [boolean, setBoolean] = React.useState(false);
    const [updateAddress, setUpdateAddress] = React.useState(false);
    const [dataAddress, setDataAddress] = React.useState({
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
    });

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

    const removeItem = (skuItem) => {
        setDataItem(dataItem.filter((item) => item.sku !== skuItem));
    };
    useEffect(() => {
        if (data) {
            setDataItem(dataOriginal.items);
        }
    }, [data]);

    useEffect(() => {
        if (Object.keys(validationItem).length) {
            dataAdded.name = validationItem.name;
            setDataItem([...dataItem, dataAdded]);
        }
    }, [validationItem]);

    useEffect(() => {
        if (dataItem === dataOriginal.items) {
            setBoolean(true);
        } else {
            setBoolean(false);
        }
    }, [dataItem]);

    const checkDataFirst = () => {
        const found = dataItem.some((el) => el.sku === formikValidateItem.values.sku);
        if (!found) {
            formikValidateItem.handleSubmit();
        } else {
            window.toastMessage({
                open: true,
                text: 'Product with same SKU code is founded in table. Please remove the one from table or recheck your sku input!',
                variant: 'error',
            });
        }
    };
    const checkEditChanges = () => {
        if (dataItem !== dataOriginal.items || updateAddress) {
            handleEditItem(updateAddress, dataAddress, dataItem !== dataOriginal.items);
        }
    };

    return (
        <>
            <Paper className={classes.container}>
                <OrderAccountInformation data={data} />
                <BillingShippingAddress
                    data={data}
                    props={props}
                    editAddress
                    dataAddress={dataAddress}
                    setUpdateAddress={setUpdateAddress}
                    setDataAddress={setDataAddress}
                    setBoolean={setBoolean}
                    checkEditChanges={checkEditChanges}
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
                                    <StyledTableCell />
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {dataItem && dataItem.length === 0
                                    ? (
                                        <div className={classes.loadingFetch}>
                                            No records to display
                                        </div>
                                    )
                                    : dataItem?.map((row, index) => (
                                        <>
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.sku || '-'}
                                                </StyledTableCell>
                                                <StyledTableCell>{row.name}</StyledTableCell>
                                                <StyledTableCell>{(row.qty ? row.qty : row.quantity) || '-'}</StyledTableCell>
                                                <StyledTableCell style={{ textAlign: 'center' }}>{row.price ? moneyFormat(row.price.amount, row.price.currencyCode) : '-'}</StyledTableCell>
                                                <StyledTableCell>-</StyledTableCell>
                                                <StyledTableCell>{row.location_code || '-'}</StyledTableCell>
                                                <StyledTableCell>{row.replacement_for || '-'}</StyledTableCell>
                                                <StyledTableCell>
                                                    <Button buttonType="secondary" onClick={() => removeItem(row.sku)}>Remove </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            {row.components ? (
                                                row.components.map((detailRow, indx) => (
                                                    <StyledTableRow key={indx}>
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
                                                        <StyledTableCell />
                                                    </StyledTableRow>
                                                ))) : null}
                                        </>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <h3>Add new Item</h3>
                <div className={classes.formAddItem}>
                    <div className={classes.fieldAdd}>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="sku"
                            value={formikValidateItem.values.sku}
                            placeholder="SKU"
                            onChange={formikValidateItem.handleChange}
                            error={!!(formikValidateItem.touched.sku && formikValidateItem.errors.sku)}
                            helperText={(formikValidateItem.touched.sku && formikValidateItem.errors.sku) || ''}
                        />
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="qty"
                            type="number"
                            value={formikValidateItem.values.qty}
                            placeholder="QTY"
                            onChange={formikValidateItem.handleChange}
                            error={!!(formikValidateItem.touched.qty && formikValidateItem.errors.qty)}
                            helperText={(formikValidateItem.touched.qty && formikValidateItem.errors.qty) || ''}
                        />
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="replacement_for"
                            value={formikValidateItem.values.replacement_for}
                            placeholder="SKU replacement for"
                            onChange={formikValidateItem.handleChange}
                            error={!!(formikValidateItem.touched.replacement_for && formikValidateItem.errors.replacement_for)}
                            helperText={(formikValidateItem.touched.replacement_for && formikValidateItem.errors.replacement_for) || ''}
                        />
                        <Button
                            buttonType="secondary"
                            className={classes.buttonSave}
                            onClick={checkDataFirst}
                        >
                            Add Item
                        </Button>
                    </div>
                    <Button
                        buttonType="primary"
                        disabled={boolean}
                        className={classes.buttonSave}
                        onClick={checkEditChanges}
                    >
                        Save changes
                    </Button>
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

export default orderEditContent;
