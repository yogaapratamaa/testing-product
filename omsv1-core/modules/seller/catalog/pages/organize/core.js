import React from 'react';
import Layout from '@layout';
// import gqlService from '@sellermodules/catalog/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ContentWrapper = (props) => {
    const { Content, t } = props;
    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('registerseller:This_is_a_Required_field')),
        }),
        // onSubmit: (values) => {
        //     console.log({ values });
        // },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];
        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    const contentProps = {
        formik,
        handleDropFile,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};
const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellercatalog:Organize_Products_at_Once'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }
    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return <Layout pageConfig={pageConfig} />;
    }

    const contentProps = {
        ...props,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};

export default Core;
