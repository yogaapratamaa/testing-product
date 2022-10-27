/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
/* eslint-disable brace-style */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { getLogistixConfiguration, saveStoreConfig } from '@modules/configurationlogistix/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';
import { regexMultipleEmail } from '@helper_regex';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        refetch,
        t,
    } = props;
    const [saveLogistixConfiguration] = saveStoreConfig();

    const handleSubmit = (input) => {
        let tempArray = [];
        for (const key in input) {
            if (input[key].type === 'multiselect') {
                delete input[key].form_fields;
                input[key].value = input[key].value.join(',');
                tempArray.push(input[key]);
            }
            else {
                delete input[key].form_fields;
                tempArray.push(input[key]);
            }
        }
        window.backdropLoader(true);
        saveLogistixConfiguration({
            variables: { input: [...tempArray] },
        })
            .then((res) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: res.data.saveStoreConfig,
                    variant: 'success',
                });
                refetch();
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

    const dataLogistix = [...data.getLogistixConfiguration];

    let tempData = {};
    const validationSchema = {};

    data?.getLogistixConfiguration?.map((parent) => {
        parent.fields.map((firstChild) => {
            const key = firstChild.id.replaceAll('/', '_');
            let value = firstChild.value;
            if (firstChild.type === 'multiselect') {
                if (Array.isArray(firstChild.value) || !firstChild.value?.length || firstChild.value === null) {
                    value = [firstChild.value];
                }
                else {
                    value = (firstChild.value.split(',').length > 0) ? firstChild.value.split(',') : [firstChild.value];
                }
            }
            tempData[key] = {
                path: firstChild.id,
                value,
                is_default: firstChild.is_default,
                type: firstChild.type,
                form_fields: firstChild.form_fields,
            };
            if (firstChild.type === 'email') {
                validationSchema[key] = Yup.object().shape({
                    value: Yup.string().nullable().matches(regexMultipleEmail, t('logistixconfiguration:Invalid_email_format')),
                });
            }
        });
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ...tempData,
        },
        validationSchema: Yup.object().shape({
            ...validationSchema,
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        dataLogistix,
        t,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('logistixconfiguration:Logistix_Configuration'),
    };
    
    const { loading, data, refetch } = getLogistixConfiguration();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'configuration_logistix',
    });

    React.useEffect(() => {
        BackdropLoad(loading || aclCheckLoading);
    }, [loading, aclCheckLoading]);

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: t('logistixconfiguration:Data_not_found'),
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/');
        }, 1000);
        return (
            <Layout pageConfig={pageConfig}>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    {t('logistixconfiguration:Data_not_found')}
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} refetch={refetch} {...props} />
        </Layout>
    );
};

export default Core;
