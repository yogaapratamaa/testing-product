/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import TextField from '@common_textfield';
import Button from '@common_button';
import InputAdornment from '@material-ui/core/InputAdornment';
import useStyles from '@modules/login/pages/default/components/style';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = (props) => {
    const classes = useStyles();
    const {
        formik,
        storeLogo,
        t,
        recaptchaRef,
        recaptcha,
        dataConfig,
    } = props;
    const router = useRouter();

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        formik.setFieldValue('captcha', captchaCode);
    };

    return (
        <div className={clsx(classes.loginContainer)}>
            <div className={classes.containLeft}>
                <div className={classes.headerLogin}>
                    <img
                        alt="logo"
                        src={storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'}
                        style={{ maxHeight: 52, cursor: 'pointer' }}
                        onClick={() => router.push('/')}
                    />
                    <LanguageSelect />
                </div>
                <div className={classes.loginContent}>
                    <div className={classes.titleContainer}>
                        <div className={classes.textTitle}>
                            {t('registervendor:Hello_Again')}
                            <div className={classes.textTitle2}>{t('registervendor:Welcome_back_Please_enter_your_details')}</div>
                        </div>
                    </div>
                    <div style={{ height: 30 }} />
                    <form onSubmit={(e) => formik.handleSubmit(e)}>
                        <div className="row center-xs start-sm">
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <TextField
                                    name="email"
                                    placeholder={t('login:Email')}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <img alt="" src="/assets/img/icon-email-new.svg" className={classes.iconImg} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    helperText={(formik.touched.email && formik.errors.email) || ''}
                                />
                            </div>
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <TextField
                                    name="password"
                                    placeholder={t('login:Password')}
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className={classes.textInput}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <img alt="" src="/assets/img/icon-lock-new.svg" className={classes.iconImg} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={!!(formik.touched.password && formik.errors.password)}
                                    helperText={(formik.touched.password && formik.errors.password) || ''}
                                />
                            </div>
                            <div className={classes.btnTextForgot}>
                                <Link href="/forgotpassword">
                                    <a>{t('login:Forgot_Password')}</a>
                                </Link>
                            </div>
                            {recaptcha.enable
                                && (
                                    <div
                                        className={clsx('col-xs-12 col-sm-12', classes.formField)}
                                        style={{ display: 'flex', justifyContent: 'center' }}
                                    >
                                        <ReCAPTCHA
                                            name="captcha"
                                            sitekey={recaptcha.sitekey}
                                            onChange={onReCAPTCHAChange}
                                            ref={recaptchaRef}
                                        />
                                    </div>
                                )}
                            <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className={classes.btnLogin}
                                    disabled={recaptcha.enable && !formik.values.captcha}
                                >
                                    <span className={classes.btnLoginText}>{t('login:Sign_in')}</span>
                                </Button>
                            </div>
                            {dataConfig
                            && (
                                <div className={classes.btnSignUp}>
                                    <span>
                                        {t('login:Don’t_have_an_account')}
                                        {' '}
                                        <Link href="/seller/register">
                                            <a>{t('login:Sign_up')}</a>
                                        </Link>
                                    </span>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            <div className={classes.containRight} style={{ backgroundImage: "url('/assets/img/swift-bg-new.png')" }} />
        </div>
    );
};

export default Login;
