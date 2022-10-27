import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationintegrations/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const { data, Content, t } = props;
    const router = useRouter();
    const integration = data.getIntegrationById;
    const [updateIntegration] = gqlService.updateIntegration();

    const handleSubmit = ({
        name, email, callback_url, identity_link_url, password,
    }) => {
        const variables = {
            integration_id: integration.integration_id,
            name,
            email,
            callback_url,
            identity_link_url,
            password,

        };
        window.backdropLoader(true);
        updateIntegration({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('configurationintegrations:integration_has_been_updated'),
                variant: 'success',
            });
            setTimeout(() => router.push('/configurations/integrations'), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const integrationDetail = {
        name: integration.name,
    };

    const formik = useFormik({
        initialValues: {
            name: integration.name,
            email: integration.email,
            callback_url: integration.callback_url,
            identity_link_url: integration.identity_link_url,
            consumer_key: integration.consumer_key,
            consumer_secret: integration.consumer_secret,
            token: integration.token,
            token_secret: integration.token_secret,
            password: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('configurationintegrations:This_is_a_Required_field')),
            email: Yup.string().nullable(),
            callback_url: Yup.string().nullable(),
            identity_link_url: Yup.string().nullable(),
            password: Yup.string().required(t('configurationintegrations:This_is_a_Required_field')),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        integrationDetail,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const { loading, data, error } = gqlService.getIntegrationById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_config_integrations',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('integrationconfigurations:Data_not_found');
        const redirect = '/configurations/integrations';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        t,
    };

    return (
        <Layout>
            <ContentWrapper
                {...contentProps}
                {...props}
            />
        </Layout>
    );
};

export default Core;
