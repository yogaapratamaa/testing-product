import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/configurationintegrations/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const [createIntegration] = gqlService.createIntegration();

    const handleSubmit = ({
        name, email, callback_url, identity_link_url, activate, password,
    }) => {
        const variables = {
            name, email, callback_url, identity_link_url, activate, password,
        };
        window.backdropLoader(true);
        createIntegration({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('configurationintegrations:New_integration_has_been_saved'),
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

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            callback_url: '',
            identity_link_url: '',
            activate: false,
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

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_config_integrations',
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
        t,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
