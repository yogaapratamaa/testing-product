/* eslint-disable prefer-destructuring */
import gqlService from '@modules/forgotpassword/services/graphql';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { regexEmail } from '@helper_regex';

const Core = (props) => {
    const { Content, storeLogo, t } = props;
    const router = useRouter();
    const { token, email } = router.query;
    const [setNewPassword] = gqlService.setNewPassword();
    const { error } = gqlService.validateResetPasswordLinkToken({
        token,
    });

    useEffect(() => {
        if (!token || !email) {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('forgotpassword:invalid_link'),
            });
            setTimeout(() => router.push('/login'), 2500);
        }
        if (email) {
            Yup.string()
                .email()
                .isValid(email)
                .then((isValid) => {
                    if (!isValid) {
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('forgotpassword:invalid_email'),
                        });
                        setTimeout(() => router.push('/login'), 2500);
                    }
                });
        }

        if (error) {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: error.message,
            });
            setTimeout(() => router.push('/login'), 2500);
        }
    }, [token, email, error]);

    const formik = useFormik({
        initialValues: {
            token: token ?? '',
            email: email ?? '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(t('forgotpassword:This_is_a_Required_field')).matches(regexEmail, t('forgotpassword:Invalid_email_format')),
            token: Yup.string().required(t('forgotpassword:This_is_a_Required_field')),
            password: Yup.string().required(t('forgotpassword:This_is_a_Required_field')),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], t('forgotpassword:Passwords_must_match'))
                .required(t('forgotpassword:Passwords_must_match')),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            const variables = { input: { ...values } };

            window.backdropLoader(true);
            setNewPassword({
                variables,
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'success',
                        text: t('forgotpassword:You_updated_your_password'),
                    });
                    setTimeout(() => router.push('/login'), 1500);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message,
                    });
                });
        },
    });

    const contentProps = {
        formik,
        storeLogo,
        t,
    };

    const pageConfig = {
        header: false,
        sidebar: false,
        title: t('forgotpassword:Set_a_New_Password'),
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
