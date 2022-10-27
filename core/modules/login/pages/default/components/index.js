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
// import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import ReCAPTCHA from 'react-google-recaptcha';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const Login = (props) => {
    const classes = useStyles();
    const {
        formik,
        // storeLogo,
        // t,
        recaptchaRef,
        recaptcha,
        // dataConfig,
    } = props;
    const router = useRouter();
    // eslint-disable-next-line no-console
    // console.log('logo', storeLogo);

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        formik.setFieldValue('captcha', captchaCode);
    };

    return (
        <div className={clsx(classes.loginContainer)}>
            <div className={classes.headerLogin}>
                <div className={classes.swiftOmsLogo}>
                    <div>
                        <img
                            alt="logo"
                            // src={storeLogo?.logo || '/assets/img/swiftoms_logo_v2.png'}
                            src="/assets/img/swiftoms_logo_v2.png"
                            style={{ maxHeight: 52, cursor: 'pointer' }}
                            onClick={() => router.push('/')}
                        />
                    </div>
                    <div>
                        <h1>
                            |
                            OMS v2
                        </h1>
                    </div>
                </div>
                {/* <LanguageSelect /> */}
            </div>
            <div className={classes.loginContent}>
                <div className={classes.titleContainer}>
                    <div className={classes.textTitle}>
                        {/* {t('registervendor:Hello_Again')} */}
                        Hello Again !
                        {/* <div className={classes.textTitle2}>{t('registervendor:Welcome_back_Please_enter_your_details')}</div> */}
                        <div className={classes.textTitle2}>Welcome back. Please enter your details</div>
                    </div>
                </div>
                <div style={{ height: 30 }} />
                <form onSubmit={(e) => formik.handleSubmit(e)}>
                    <div className="row center-xs start-sm">
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <TextField
                                name="username"
                                // placeholder={t('login:Email')}
                                placeholder="Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                className={classes.textInput}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon className={classes.iconImg} />
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!(formik.touched.username && formik.errors.username)}
                                helperText={(formik.touched.username && formik.errors.username) || ''}
                            />
                        </div>
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <TextField
                                name="password"
                                // placeholder={t('login:Password')}
                                placeholder="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className={classes.textInput}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon className={classes.iconImg} />
                                        </InputAdornment>
                                    ),
                                }}
                                error={!!(formik.touched.password && formik.errors.password)}
                                helperText={(formik.touched.password && formik.errors.password) || ''}
                            />
                        </div>
                        <div className={classes.btnTextForgot}>
                            <Link href="/forgotpassword">
                                {/* <a>{t('login:Forgot_Password')}</a> */}
                                <a>Forgot Password</a>
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
                                {/* <span className={classes.btnLoginText}>{t('login:Sign_in')}</span> */}
                                <span className={classes.btnLoginText}>Sign in</span>
                            </Button>
                        </div>
                        {/* {dataConfig
                            && (
                                <div className={classes.btnSignUp}>
                                    <span>
                                        {t('login:Don’t_have_an_account')}
                                        {' '}
                                        <Link href="/register">
                                            <a>{t('login:Sign_up')}</a>
                                        </Link>
                                    </span>
                                </div>
                            )} */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
