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
            name: '',
            sku: '',
            price: '',
            stock: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
            sku: Yup.string().required(t('sellercatalog:This_is_a_Required_field')),
            price: Yup.number().typeError(t('sellercatalog:Value_must_be_a_number')).required(t('sellercatalog:This_is_a_Required_field')),
            stock: Yup.number().typeError(t('sellercatalog:Value_must_be_a_number')).required(t('sellercatalog:This_is_a_Required_field')),
        }),
        // onSubmit: (values) => {
        //     console.log({ values });
        // },
    });

    const handleDropFile = (files, name) => {
        const { baseCode, file } = files[0];
        const input = formik.values[name] || [];
        input.push({
            binary: baseCode,
            types: [],
            position: 0,
            is_deleted: false,
            name: file.name,
            size: `${file.size / 1000} KB`,
        });
        formik.setFieldValue(name, input);
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
        title: t('sellercatalog:Add_Product'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading);
    }, [aclCheckLoading]);

    if (aclCheckLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }
    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        ...props,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper
                {...contentProps}
            />
        </Layout>
    );
};

export default Core;
