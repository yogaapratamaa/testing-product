import Layout from '@layout';
import gqlService from '@modules/shipment/services/graphql';
// import aclService from '@modules/theme/services/graphql';
// import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import formatDate from '@helper_date';

const fetch = require('cross-fetch');

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: 'Shipment',
    };

    const [varExport, setVarExport] = React.useState({});
    const [collect, setCollect] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [showModalDeliver, setShowModalDeliver] = React.useState(false);
    const [getShipmentList, { data, loading }] = gqlService.getShipmentList();
    const variable = {
        input: {
            ids: collect,
        },
    };

    const { data: dataChannelStoreName, loading: loadingChannelStoreName } = gqlService.getChannelStoreName({ variables: variable });

    const handleImportDeliver = async (values) => {
        window.backdropLoader(true);
        const fetchResult = await fetch('https://edge.oms-v2.srcli.xyz.dmmy.me/shipments/bulk-delivered', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                base64: values.base64,
            }),
        });
        try {
            const res = fetchResult;
            if (res.status === 200) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Import Shipment Delivered Success!',
                    variant: 'success',
                });
                setShowModalDeliver(false);
                setTimeout(() => {
                    const aElement = document.createElement('a');
                    aElement.setAttribute('download', `DeliveredShipmentResult-${formatDate()}.csv`);
                    // eslint-disable-next-line no-underscore-dangle
                    const href = URL.createObjectURL(res._bodyBlob);
                    aElement.href = href;
                    aElement.setAttribute('target', '_blank');
                    aElement.click();
                    URL.revokeObjectURL(href);
                }, 300);
                return;
            } if (res.status === 400) {
                const resJson = await res.json();
                setTimeout(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: `Import Shipment Delivered Failed! ${resJson.error}`,
                        variant: 'error',
                    });
                }, 1000);
            }
        } catch (error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Import Shipment Delivered Failed!',
                variant: 'error',
            });
        }
    };

    const formikImportDeliver = useFormik({
        initialValues: {
            base64: '',
        },
        validationSchema: Yup.object().shape({
            base64: Yup.string().required('Required!'),
        }),
        onSubmit: async (values, { resetForm }) => {
            handleImportDeliver(values, resetForm);
            resetForm();
        },
    });

    const handleBulktShipmentRTS = async (values) => {
        window.backdropLoader(true);
        const fetchResult = await fetch('https://edge.oms-v2.srcli.xyz.dmmy.me/shipments/rts-importcsv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                base64: values.base64,
            }),
        });
        try {
            const res = fetchResult;
            if (res.status === 200) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Import Bulk RTS Shipment Success!',
                    variant: 'success',
                });
                setShowModal(false);
                setTimeout(() => {
                    const aElement = document.createElement('a');
                    aElement.setAttribute('download', `BulkRTSResult-${formatDate()}.csv`);
                    // eslint-disable-next-line no-underscore-dangle
                    const href = URL.createObjectURL(res._bodyBlob);
                    aElement.href = href;
                    aElement.setAttribute('target', '_blank');
                    aElement.click();
                    URL.revokeObjectURL(href);
                }, 300);
                return;
            } if (res.status === 400) {
                const resJson = await res.json();
                setTimeout(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: `Import Bulk RTS Shipment Failed! ${resJson.error}`,
                        variant: 'error',
                    });
                }, 1000);
            }
        } catch (error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Import Bulk RTS Shipment Failed!',
                variant: 'error',
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            base64: '',
        },
        validationSchema: Yup.object().shape({
            base64: Yup.string().required('Required!'),
        }),
        onSubmit: async (values, { resetForm }) => {
            handleBulktShipmentRTS(values, resetForm);
            resetForm();
        },
    });

    const handleDropFile = (files) => {
        if (files.length === 0) {
            formik.setFieldValue('base64', '');
        } else {
            const { baseCode } = files[0];
            const idx = baseCode.indexOf('base64,');
            formik.setFieldValue('base64', baseCode.slice(idx + 7));
        }
    };
    const dropFileDeliver = (files) => {
        if (files.length === 0) {
            formikImportDeliver.setFieldValue('base64', '');
        } else {
            const { baseCode } = files[0];
            const idx = baseCode.indexOf('base64,');
            formikImportDeliver.setFieldValue('base64', baseCode.slice(idx + 7));
        }
    };

    React.useEffect(() => {
        BackdropLoad(loading || loadingChannelStoreName);
    }, [loading, loadingChannelStoreName]);

    React.useEffect(() => {
        if (data) {
            const collectStoreId = data && data?.shipmentList.items.map((item) => item.storeId);
            const onlyUnique = (val, inxd, self) => self.indexOf(val) === inxd;
            const unique = collectStoreId.filter(onlyUnique);
            if (collect) {
                setCollect(unique);
            }
        }
    }, [data]);

    const contentProps = {
        getShipmentList,
        dataChannelStoreName,
        loadingChannelStoreName,
        formik,
        formikImportDeliver,
        showModal,
        showModalDeliver,
        setShowModal,
        setShowModalDeliver,
        handleDropFile,
        dropFileDeliver,
        // setReallocation,
        data,
        loading,
        // exportOrderToCsv,
        // handleExport,
        varExport,
        setVarExport,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
