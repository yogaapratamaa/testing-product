import useStyles from '@modules/return/pages/view/components/style';

const BillingShippingAddress = (props) => {
    const {
        data,
    } = props;
    const classes = useStyles();
    return (
        <>
            <h2> Address Information</h2>
            <div className={classes.contentHeader}>
                <div className="grid-child">
                    <>
                        {/* <h5 className={classes.titleSmall}>{t('allshipment:Shipping_Address')}</h5> */}
                        <h4 className={classes.titleSmall}>Shipping Address</h4>
                        <span className={classes.orderLabel}>
                            {data?.orderDetail.shipments[0].recipient.name || '-'}
                        </span>
                        <span className={classes.orderLabel}>
                            {`${data?.orderDetail.shipments[0].recipient.street || '-'} ,
                             ${data?.orderDetail.shipments[0].recipient.subDistrict || '-'}`}
                        </span>
                        <span className={classes.orderLabel}>
                            {`${data?.orderDetail.shipments[0].recipient.city || '-'} ,
                          ${data?.orderDetail.shipments[0].recipient.province || '-'} ,
                          ${data?.orderDetail.shipments[0].recipient.postalCode || '-'}`}
                        </span>
                        <span className={classes.orderLabel}>{data?.orderDetail.shipments[0].recipient.country || '-'}</span>
                        <span className={classes.orderLabel}>
                            {`Mobile :
                            ${data?.orderDetail.shipments[0].recipient.mobile || '-'}`}
                        </span>
                        <span className={classes.orderLabel}>
                            {`Phone :
                            ${data?.orderDetail.shipments[0].recipient.phone || '-'}`}
                        </span>
                    </>
                </div>
            </div>
            <h2> Payment Information</h2>
            <div className={classes.contentHeader}>
                <div className="grid-child">
                    {/* <h5 className={classes.titleSmall}>{t('allshipment:Customer_Info')}</h5> */}
                    <h3 className={classes.titleSmall}>Payment Information</h3>
                    <span className={classes.orderLabel}>
                        {`${data?.orderDetail.payments[0].provider} - ${data?.orderDetail.payments[0].service}` || '-'}
                    </span>
                </div>
                <div className="grid-child">
                    {/* <h5 className={classes.titleSmall}>{t('allshipment:Shipping_Address')}</h5> */}
                    <h4 className={classes.titleSmall}>Shipping & Handling Information</h4>
                    <span className={classes.orderLabel}>
                        {`${data?.orderDetail.shipments[0].provider} - ${data?.orderDetail.shipments[0].service}` || '-'}
                    </span>
                </div>
            </div>
        </>
    );
};

export default BillingShippingAddress;
