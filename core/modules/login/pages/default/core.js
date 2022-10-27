/* eslint-disable prefer-destructuring */
import { getToken, getCustomer } from '@modules/login/services/graphql';
import { expiredToken, custDataNameCookie } from '@config';
import { setLogin } from '@helper_auth';
import { useRouter } from 'next/router';
import Layout from '@layout';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import qs from 'querystring';

const ContentWrapper = (props) => {
    const {
        Content, storeLogo, t, recaptcha,
    } = props;
    const router = useRouter();

    const [getCustomerData] = getCustomer({
        onCompleted: (res) => {
            if (res.getCurrentUser.fullname) {
                Cookies.set(custDataNameCookie, res.getCurrentUser);
                router.push('/orders');
            } else {
                router.push('/');
            }
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });
    const [getCustomerToken] = getToken();
    const recaptchaRef = React.createRef();
    const { secretkey } = recaptcha;

    const handleSubmit = (variables) => {
        getCustomerToken({
            variables,
        }).then(async ({ data }) => {
            const token = data.internalGenerateCustomerToken.token;
            if (token) {
                setLogin(1, expiredToken);
                getCustomerData();
            }
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message.split(':')[0],
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            // captcha: '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(t('login:This_is_a_Required_field')),
            password: Yup.string().required(t('login:This_is_a_Required_field')),
            // email: Yup.string().required(t('login:This_is_a_Required_field')).matches(regexEmail, t('login:Invalid email format!')),
            // captcha: recaptcha.enable && Yup.string().required(`Captcha ${t('registervendor:required')}`),
        }),
        onSubmit: async (values) => {
            const { captcha, ...restValues } = values;
            window.backdropLoader(true);
            if (recaptcha.enable) {
                fetch('/captcha-validation', {
                    method: 'POST',
                    body: qs.stringify({
                        secret: secretkey,
                        response: captcha,
                    }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
                })
                    .then((res) => res.json())
                    .then((json) => {
                        if (json.success) {
                            handleSubmit(restValues);
                        } else {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                variant: 'error',
                                text: t('login:There_is_something_error_while_verifying_captcha'),
                            });
                        }
                    })
                    .catch(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('login:Could_not_verify_captcha'),
                        });
                    });
                recaptchaRef.current.reset();
            } else {
                handleSubmit(restValues);
            }
        },
    });

    const contentProps = {
        formik,
        storeLogo,
        t,
        recaptchaRef,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { t } = props;

    const pageConfig = {
        title: t('login:Login'),
        header: false,
        sidebar: false,
    };

    // const { loading: loadingConfig, data: dataConfig } = getStoreConfig({
    //     path: 'swiftoms_vendorportal/configuration/enable_vendor_portal',
    // });
    // const { loading: loadEnabled, data: dataEnabled } = getStoreConfig({
    //     path: 'msp_securitysuite_recaptcha/frontend/enabled',
    // });
    // const { loading: loadEnabledReg, data: dataEnabledReg } = getStoreConfig({
    //     path: 'msp_securitysuite_recaptcha/frontend/enabled_login',
    // });
    // const { loading: loadPubKey, data: dataPubKey } = getStoreConfig({
    //     path: 'msp_securitysuite_recaptcha/general/public_key',
    // });
    // const { loading: loadPrivKey, data: dataPrivKey } = getStoreConfig({
    //     path: 'msp_securitysuite_recaptcha/general/private_key',
    // });
    // eslint-disable-next-line no-console
    // console.log(dataEnabled, dataEnabledReg, dataPubKey, dataPrivKey);

    // React.useEffect(() => {
    //     BackdropLoad(loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadingConfig);
    // }, [loadEnabled, loadEnabledReg, loadPubKey, loadPrivKey, loadingConfig]);

    // if (loadEnabled || loadEnabledReg || loadPubKey || loadPrivKey || loadingConfig) {
    //     return <Layout pageConfig={pageConfig} />;
    // }

    const contentProps = {
        ...props,
        recaptcha: {
            // enable: dataEnabled.getStoreConfig === '1' && dataEnabledReg.getStoreConfig === '1',
            // sitekey: dataPubKey.getStoreConfig,
            // secretkey: dataPrivKey.getStoreConfig,
        },
        // dataConfig: dataConfig && dataConfig.getStoreConfig && dataConfig.getStoreConfig === '1',
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
