/* eslint-disable no-unused-vars */

import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/shipmentmarketplace/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const pageConfig = {
        title: t('shipmentmarketplace:Marketplace__Bulk_Update_Portcode'),
    };

    const [activityState, setActivityState] = React.useState();
    const [firstLoad, setFirstLoad] = React.useState(true);
    const [showProgress, setshowProgress] = React.useState(false);
    const [bulkPortCodeUpload] = gqlService.bulkPortCodeUpload();
    const [getActivity] = gqlService.getActivity({
        variables: {
            code: 'update_portcode',
        },
        onCompleted: (res) => {
            setActivityState(res.getActivity);
            if (firstLoad) {
                setFirstLoad(false);
            }
            if (res.getActivity.run_status === 'running') {
                setTimeout(() => {
                    getActivity();
                }, 5000);
            }
        },
        onError: () => {
            getActivity();
        },
    });

    React.useEffect(() => {
        getActivity();
    }, []);

    const handleSubmit = ({
        binary,
    }) => {
        const variables = {
            binary,
        };
        window.backdropLoader(true);
        bulkPortCodeUpload({
            variables,
        });
        setTimeout(() => {
            setshowProgress(true);
            getActivity();
            window.backdropLoader(false);
        }, 2000);
    };

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('shipmentmarketplace:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        const idx = baseCode.indexOf('base64,');
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode.slice(idx + 7));
    };

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_marketplace_dashboard',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        formik,
        handleDropFile,
        activityState,
        firstLoad,
        showProgress,
        t,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
