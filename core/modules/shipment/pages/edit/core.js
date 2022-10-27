import Layout from '@layout';
import gqlService from '@modules/shipment/services/graphql';
// import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const variables = {
        orderId: router.query.id,
        shipmentId: router.query.sid,
        id: router.query.id,
    };

    const { loading, data, refetch } = gqlService.getShipmentDetail({ variables });
    const { loading: loadingChannel, data: channelId } = gqlService.getChannelByOrderId({ variables });
    const [setShipmentRTS] = gqlService.setShipmentRTS();
    const [storeId, setStoreId] = React.useState([]);
    const variableId = {
        input: {
            ids: storeId,
        },
    };
    const { data: dataChannelStoreName, loading: loadingChannelStoreName } = gqlService.getChannelStoreName({ variables: variableId });

    const handleSetShipmentRTS = (values) => {
        const variable = {
            shipmentId: values.shipmentId,
            awbNumber: values.awbNumber,
            courier: values.courier,
        };
        window.backdropLoader(true);
        setShipmentRTS({
            variables: variable,
        })
            .then((res) => {
                if (res.data.shipmentSetRTS.successIds) {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'Successfully updated',
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), 250);
                } else {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'Update failed',
                        variant: 'success',
                    });
                    setTimeout(() => refetch(), 250);
                }
            })

            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };
    const formikShipmentRTS = useFormik({
        initialValues: {
            shipmentId: router.query.sid,
            awbNumber: '',
            courier: '',
        },
        validationSchema: Yup.object().shape({
            shipmentId: Yup.string().required('This field is required!'),
            courier: Yup.string().required('This field is required!'),
        }),
        onSubmit: (values, { resetForm }) => {
            handleSetShipmentRTS(values);
            resetForm();
        },
    });

    const pageConfig = {
        title: 'Shipment',
        customBreadcrumb: [
            { url: '/shipment', label: 'Shipment' },
            { url: router.asPath, label: 'Shipment Detail' },
        ],
    };

    React.useEffect(() => {
        BackdropLoad(loading || loadingChannel || loadingChannelStoreName);
    }, [loading, loadingChannel, loadingChannelStoreName]);

    React.useEffect(() => {
        if (data) {
            const id = data && data.shipmentDetail.storeId;
            setStoreId([id]);
        }
    }, [data]);

    if (loading || loadingChannel || loadingChannelStoreName) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (data && data?.shipmentDetail.id === '') {
        const errMsg = `Order ${variables.id} couldn't be found`;
        return <ErrorRedirect errMsg={errMsg} redirect="/shipment" pageConfig={pageConfig} />;
    }

    return (
        <Layout pageConfig={pageConfig}>
            <Content
                channelId={channelId}
                data={data}
                dataChannelStoreName={dataChannelStoreName}
                formikShipmentRTS={formikShipmentRTS}
                {...props}
            />
        </Layout>
    );
};
export default Core;
