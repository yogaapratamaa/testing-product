/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import React from 'react';
// import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@common_button';
import TextField from '@common_textfield';
import formatDate from '@helper_date';
import { moneyFormat } from '@helper_currency';
import useStyles from '@modules/shipment/pages/edit/components/style';
import BillingShippingAddress from '@modules/shipment/pages/edit/components/BillingShippingAddress';
import { getIconByChannel } from '@modules/shipment/helpers';

const shipmentEditContent = (props) => {
    const {
        channelId,
        data,
        dataChannelStoreName,
        formikShipmentRTS,
    } = props;

    const channelStoreName = (dataChannelStoreName && dataChannelStoreName.channelStoreListFilter) || [];
    const channel = (channelId && channelId.orderDetail.channelId) || '';
    const shipmentStatus = (data && data.shipmentDetail.state) || '';
    const provider = (data && data.shipmentDetail.provider) || '';
    const service = (data && data.shipmentDetail.service) || '';
    const courier = `${provider} ${service}`;

    const classes = useStyles();

    const shippingOptions = [
        {
            label: courier, value: courier,
        },
    ];
    const findMyStoreName = (value) => {
        const store = channelStoreName.find((element) => element.id === value);
        if (store) {
            return `${store.name} - (${store.code})`;
        }
        return value;
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
            '&:nth-of-type(even)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const getClassByStatus = (status) => {
        if (status.toLowerCase() === 'draft'
      || status.toLowerCase() === 'allocated'
      || status.toLowerCase() === 'allocation_not_found') {
            return classes.statusDraft;
        }
        if (status.toLowerCase() === 'not_yet_shipped') {
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
        if (status.toLowerCase() === 'delivered') {
            return classes.statusDelivered;
        }
        return classes.statusNotFound;
    };

    return (
        <>
            {/* <h2 className={classes.titleTop}>{`${t('allshipment:Detail_Shipment_')} #${shipmentDetail.shipmentId}`}</h2> */}
            <h2>
                {`Detail Shipment #${data?.shipmentDetail.orderId}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="grid-child">
                        <h1 className={getClassByStatus(shipmentStatus)}>
                            {shipmentStatus.split('_').join(' ') || '-'}
                        </h1>
                    </div>
                    <div className={classes.orderDetail}>
                        <div className={classes.channelLogo}>
                            <img src={getIconByChannel(channel)} alt={channel} />
                            <span>{findMyStoreName(data.shipmentDetail.storeId)}</span>
                        </div>
                        <div>
                            <span className={classes.shipmentLabel}>
                                Channel Order Date:
                                {' '}
                                {formatDate(data?.shipmentDetail.awbRetrievedAt, 'MMM D, YYYY h:mm:ss A') || '-'}
                            </span>
                            <span className={classes.shipmentLabel}>
                                Channel Order Number:
                                {' '}
                                {data?.shipmentDetail.orderId || '-'}
                            </span>
                            <span className={classes.shipmentLabel}>
                                Tokopedia Order Number:
                                {' '}
                                {data?.shipmentDetail.awbNumber || '-'}
                            </span>
                            <span className={classes.shipmentLabel}>
                                Source AWB:
                                {' '}
                                {data?.shipmentDetail.awbNumber || '-'}
                            </span>
                            <span className={classes.shipmentLabel}>
                                Marketplace status:
                                {' '}
                                {data?.shipmentDetail.state.split('_').join(' ') || '-'}
                            </span>
                        </div>
                    </div>
                </div>
                {data?.shipmentDetail.state === 'process_for_shipping' && !data?.shipmentDetail.allocation && (
                    <div className={classes.content}>
                        <h4 className={classes.titleSmall}>
                            Ship from:
                            {data?.shipmentDetail.origin.city || '-'}
                        </h4>
                        <div style={{ marginBottom: 10 }}>
                            <Button
                                className={classes.btn}
                                type="submit"
                                // onClick={formikConfirm.handleSubmit}
                                // variant="contained"
                                buttonType="outlined"
                                style={{ marginRight: 10 }}
                            >
                                {/* {t('allshipment:Confirm')} */}
                                Back
                            </Button>
                            <Button
                                className={classes.btn}
                                type="submit"
                                // onClick={formikCantFullfill.handleSubmit}
                                variant="contained"
                                disabled
                                buttonType="outlined"
                                style={{ marginRight: 10 }}
                            >
                                {/* {t('allshipment:Cannot_Fulfill')} */}
                                Cancelled
                            </Button>
                            <Button
                                className={classes.btn}
                                type="submit"
                                // onClick={formikCantFullfill.handleSubmit}
                                variant="contained"
                                disabled
                                buttonType="outlined"
                            >
                                {/* {t('allshipment:Cannot_Fulfill')} */}
                                Delivered
                            </Button>
                        </div>
                    </div>
                )}
                <div className={classes.content}>
                    <BillingShippingAddress data={data} />
                    <div>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table" size="small">
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>SKU</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Unit Price</StyledTableCell>
                                        <StyledTableCell>Qty</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.shipmentDetail.items.map((row, index) => (
                                        <>
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.sku}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ paddingLeft: 0 }}>{row.name}</StyledTableCell>
                                                <StyledTableCell />
                                                <StyledTableCell>{row.qty}</StyledTableCell>
                                            </StyledTableRow>
                                            {row.components ? (
                                                row.components.map((detailRow) => (
                                                    <StyledTableRow>
                                                        <StyledTableCell component="th" scope="row" style={{ paddingLeft: '40px' }}>
                                                            -
                                                            {' '}
                                                            {detailRow.sku}
                                                        </StyledTableCell>
                                                        <StyledTableCell style={{ paddingLeft: 0 }}>{detailRow.name}</StyledTableCell>
                                                        <StyledTableCell>{moneyFormat(detailRow.price.amount, detailRow.price.currencyCode)}</StyledTableCell>
                                                        <StyledTableCell>{detailRow.qty}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))) : null}
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div className={classes.content}>
                    {/* <h5 className={classes.titleSmall}>{t('allshipment:Notes_for_this_Shipment')}</h5> */}
                    <h3 className={classes.titleSmall}>Shipping & Tracking Information</h3>
                    <span className={classes.titleSmall}>{`Shipping Method: ${data?.shipmentDetail.provider} - ${data?.shipmentDetail.service}`}</span>
                    <div className={classes.trackingInformation}>
                        <div style={{ display: 'grid', marginTop: 10 }}>
                            <span>Courier</span>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                select
                                name="courier"
                                value={formikShipmentRTS.values.courier}
                                onChange={formikShipmentRTS.handleChange}
                                error={!!(formikShipmentRTS.touched.courier && formikShipmentRTS.errors.courier)}
                                helperText={(formikShipmentRTS.touched.courier && formikShipmentRTS.errors.courier) || ''}
                            >
                                {shippingOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div style={{ display: 'grid', marginTop: 10 }}>
                            <span>AWB Number</span>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="awbNumber"
                                value={formikShipmentRTS.values.awbNumber}
                                onChange={formikShipmentRTS.handleChange}
                                error={!!(formikShipmentRTS.touched.awbNumber && formikShipmentRTS.errors.awbNumber)}
                                helperText={(formikShipmentRTS.touched.awbNumber && formikShipmentRTS.errors.awbNumber) || ''}
                            />
                        </div>
                    </div>

                    <div className={classes.formFieldButton}>
                        <Button
                            buttonType="primary"
                            disabled={!formikShipmentRTS.values.courier}
                            type="submit"
                            onClick={formikShipmentRTS.handleSubmit}
                        >
                            Shipped
                        </Button>
                    </div>
                </div>
                <div className={classes.content}>
                    <h3 className={classes.titleSmall}>Status History</h3>
                    <div style={{ marginTop: '20px' }}>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table" size="small">
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell>Notes</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.shipmentDetail.stateHistories && data?.shipmentDetail.stateHistories.length === 0
                                        ? (
                                            <StyledTableRow>
                                                <StyledTableCell rowSpan={3} />
                                                <StyledTableCell>
                                                    <div className={classes.loadingFetch}>
                                                        No records to display
                                                    </div>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                        : data?.shipmentDetail.stateHistories.map((row, index) => (
                                            <StyledTableRow key={index}>
                                                <StyledTableCell component="th" scope="row" style={{ width: '30%' }}>
                                                    {formatDate(row.timestamp, 'MMM D, YYYY h:mm:ss A') || '-'}
                                                </StyledTableCell>
                                                <StyledTableCell>{row.state.split('_').join(' ')}</StyledTableCell>
                                                <StyledTableCell>{row.remark}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default shipmentEditContent;
