import useStyles from '@modules/shipment/pages/edit/components/style';

const BillingShippingAddress = (props) => {
    const {
        data,
    } = props;
    const classes = useStyles();
    return (
        <>
            {/* <h2> Address Information</h2> */}
            <div className={classes.contentHeader}>
                <div className="grid-child">
                    <>
                        {/* <h5 className={classes.titleSmall}>{t('allshipment:Shipping_Address')}</h5> */}
                        <h3 className={classes.titleSmall}>Shipping Address</h3>
                        <span className={classes.shipmentLabel}>
                            {data?.shipmentDetail.recipient.name || '-'}
                        </span>
                        <span className={classes.shipmentLabel}>
                            {`${data?.shipmentDetail.recipient.street || '-'} ,
                             ${data?.shipmentDetail.recipient.subDistrict || '-'}`}
                        </span>
                        <span className={classes.shipmentLabel}>
                            {`${data?.shipmentDetail.recipient.city || '-'} ,
                          ${data?.shipmentDetail.recipient.province || '-'} ,
                          ${data?.shipmentDetail.recipient.postalCode || '-'}`}
                        </span>
                        <span className={classes.shipmentLabel}>
                            {data?.shipmentDetail.recipient.country || '-'}
                        </span>
                        <span className={classes.shipmentLabel}>
                            {`Mobile :
                            ${data?.shipmentDetail.recipient.mobile || '-'}`}
                        </span>
                        <span className={classes.shipmentLabel}>
                            {`Phone :
                            ${data?.shipmentDetail.recipient.phone || '-'}`}
                        </span>
                    </>
                </div>
                <div className="grid-child">
                    <>
                        {/* <h5 className={classes.titleSmall}>{t('allshipment:Shipping_Address')}</h5> */}
                        <h3 className={classes.titleSmall}>Delivery Order (Fulfillment)</h3>
                        <span className={classes.shipmentLabel}>
                            DO number :
                            {' '}
                            {data?.shipmentDetail.additionalInfo.doNumber || '-'}
                        </span>
                        <span className={classes.shipmentLabel}>
                            DO status :
                            {' '}
                            {data?.shipmentDetail.additionalInfo.doStatus || '-'}
                        </span>
                        <span className={classes.shipmentLabel}>
                            DO sent at :
                            {' '}
                            {data?.shipmentDetail.additionalInfo.doSentAt || '-'}
                        </span>
                        <span className={classes.shipmentLabel}>
                            DO date done at :
                            {' '}
                            {data?.shipmentDetail.additionalInfo.doDateDone || '-'}
                        </span>
                        <span className={classes.shipmentLabel}>
                            DO scheduled at :
                            {' '}
                            {data?.shipmentDetail.additionalInfo.doScheduledAt || '-'}
                        </span>
                    </>
                </div>
            </div>
        </>
    );
};

export default BillingShippingAddress;
