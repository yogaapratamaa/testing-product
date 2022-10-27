import useStyles from '@modules/orders/pages/view/components/style';
import AddressFormDialog from '@modules/orders/plugins/AddressFormDialog';
import Button from '@common_button';

const BillingShippingAddress = ({
    props,
    editAddress,
    dataAddress,
    setDataAddress,
    setBoolean,
    setUpdateAddress,
}) => {
    const {
        data,
        showModal,
        setShowModal,
    } = props;
    const classes = useStyles();

    const saveChanges = (dataForm) => {
        setDataAddress({
            name: dataForm.name || '-',
            email: dataForm.email || '-',
            street: dataForm.street || '-',
            subDistrict: dataForm.subDistrict || '',
            district: dataForm.district || '',
            city: dataForm.city || '-',
            province: dataForm.province.name || '-',
            postalCode: dataForm.postalCode || '-',
            country: dataForm.country.name || '-',
            mobile: dataForm.mobile || '-',
            phone: dataForm.phone || '-',
            additionalInfo: {
                address2: dataForm.address2 || '-',
            },
        });
        setShowModal(false);
        setUpdateAddress(true);
        setBoolean(false);
    };
    return (
        <>
            <h2> Address Information</h2>
            <div className={classes.contentHeader}>
                <div className="grid-child">
                    <>
                        {/* <h5 className={classes.titleSmall}>{t('allshipment:Shipping_Address')}</h5> */}
                        <h3 className={classes.titleSmall}>
                            Shipping Address
                            {editAddress
                                ? <Button onClick={() => setShowModal(true)} buttonType="link">Edit</Button>
                                : null}

                        </h3>
                        <span className={classes.orderLabel}>
                            {dataAddress?.name}
                        </span>
                        <span className={classes.orderLabel}>
                            {dataAddress?.email}
                        </span>
                        <span className={classes.orderLabel}>
                            {`${dataAddress?.street} ,
                             ${dataAddress?.district} ,
                             ${dataAddress?.subDistrict}`}
                        </span>
                        <span className={classes.orderLabel}>
                            {`${dataAddress?.city},${dataAddress?.province},
                            ${dataAddress?.postalCode}`}
                        </span>
                        <span className={classes.orderLabel}>{dataAddress?.country}</span>
                        <span className={classes.orderLabel}>
                            {`Mobile :
                            ${dataAddress?.mobile}`}
                        </span>
                        <span className={classes.orderLabel}>
                            {`Phone :
                            ${dataAddress?.phone}`}
                        </span>
                    </>
                </div>
                <div className="grid-child">
                    <>
                        {/* <h5 className={classes.titleSmall}>{t('allshipment:Shipping_Address')}</h5> */}
                        <h3 className={classes.titleSmall}>Shipping Address 2 (Optional)</h3>
                        <span className={classes.orderLabel}>
                            {dataAddress?.additionalInfo.address2}
                        </span>
                        {/* <span className={classes.orderLabel}>
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
                        </span> */}
                    </>
                </div>
            </div>
            <h2> Payment Information</h2>
            <div className={classes.contentHeader}>
                <div className="grid-child">
                    {/* <h5 className={classes.titleSmall}>{t('allshipment:Customer_Info')}</h5> */}
                    <h3 className={classes.titleSmall}>Payment Information</h3>
                    <span className={classes.paymentLabel}>
                        {`${data?.orderDetail.payments[0].provider} - ${data?.orderDetail.payments[0].service}` || '-'}
                    </span>
                </div>
                <div className="grid-child">
                    {/* <h5 className={classes.titleSmall}>{t('allshipment:Shipping_Address')}</h5> */}
                    <h3 className={classes.titleSmall}>Shipping & Handling Information</h3>
                    <span className={classes.paymentLabel}>
                        {`${data?.orderDetail.shipments[0].provider} - ${data?.orderDetail.shipments[0].service}` || '-'}
                    </span>
                </div>
            </div>
            <AddressFormDialog
                {...props}
                onSubmitAddress={saveChanges}
                dataAddress={dataAddress}
                showModal={showModal}
                setShowModal={() => setShowModal(!showModal)}
            />
        </>
    );
};

export default BillingShippingAddress;
