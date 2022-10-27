/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Button from '@common_button';
import useStyles from '@sellermodules/register/pages/default/components/style';
import GetScore from '@helper_passwordstrength';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Step1 from '@sellermodules/register/pages/default/components/stepform/step1';
import Step2 from '@sellermodules/register/pages/default/components/stepform/step2';
import { PRIMARY_DARK } from '@theme_color';

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: PRIMARY_DARK,
        },
    },
    completed: {
        '& $line': {
            borderColor: PRIMARY_DARK,
        },
    },
    line: {
        borderTopWidth: 2,
        borderRadius: 1,
    },
})(StepConnector);

const RegisterSeller = (props) => {
    const classes = useStyles();
    const {
        formik, storeLogo, t, createStore, isSuccess, recaptcha, username,
    } = props;

    const router = useRouter();
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorStatus, setPasswordErrorStatus] = useState('');
    const [activeStep, setActiveStep] = React.useState(0);
    const [termAgree, setTermAgree] = React.useState(false);

    const maxSteps = createStore ? 1 : 0;
    const steps = [t('registerseller:Account_Information'), t('registerseller:Store_Information')];
    const keyStepOne = ['name', 'email', 'password', 'password_confirmation', 'phone_number'];
    const keysError = Object.keys(formik.errors);

    const isDisabled = activeStep === maxSteps && (recaptcha.enable ? (!termAgree || !formik.values.captcha) : !termAgree);
    const isDisabledNext = keyStepOne.some((item) => keysError.includes(item)) || passwordError;

    const onClickSubmit = (e) => {
        e.preventDefault();
        if (activeStep === maxSteps) {
            formik.handleSubmit();
        } else if (isDisabledNext) {
            formik.setTouched({ ...formik.touched, ...Object.fromEntries(keyStepOne.map((key) => ([key, true]))) });
            const keys = Object.keys(formik.errors).filter((key) => keyStepOne.includes(key))
                .sort((a, b) => keyStepOne.indexOf(a) - keyStepOne.indexOf(b));
            if (keys.length > 0) {
                const keyName = keys[0];
                const node = document.getElementsByName(keyName);
                if (node.length) {
                    node[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                    node[0].focus();
                }
            }
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            formik.setFieldValue('captcha', '');
            return;
        }
        formik.setFieldValue('captcha', captchaCode);
    };

    const renderComponent = () => {
        switch (activeStep) {
        case 0:
            return (
                <Step1
                    onReCAPTCHAChange={onReCAPTCHAChange}
                    termAgree={termAgree}
                    setTermAgree={setTermAgree}
                    passwordErrorStatus={passwordErrorStatus}
                    passwordError={passwordError}
                    {...props}
                />
            );
        case 1:
            return <Step2 onReCAPTCHAChange={onReCAPTCHAChange} termAgree={termAgree} setTermAgree={setTermAgree} {...props} />;
        default:
            return <Step1 {...props} />;
        }
    };

    useEffect(() => {
        if (formik.values.password) {
            const passwordScore = GetScore(formik.values.password, 8, 3);
            setPasswordError(`${passwordScore.message ? `${passwordScore.message} or password too common` : ''}`);
            setPasswordErrorStatus(passwordScore.status);
        }
    }, [formik.values.password]);

    useEffect(() => {
        if (createStore) {
            formik.setFieldValue('captcha', '');
        }
    }, [activeStep]);

    useEffect(() => {
        if (!formik.isSubmitting) return;
        if (createStore) {
            if (keysError.length > 0) {
                const keyName = keysError[0];
                if (keyStepOne.some((item) => keysError.includes(item))) {
                    setActiveStep(0);
                }
                const node = document.getElementsByName(keyName);
                if (node?.length) {
                    node[0].scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                    node[0].focus();
                }
            }
        }
    }, [formik]);

    return (
        <div className={clsx(classes.container)}>
            <div className={classes.containLeft}>
                <div className={classes.header}>
                    <img
                        className="imgIcon"
                        alt=""
                        src={storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'}
                        style={{ maxHeight: 52, cursor: 'pointer' }}
                        onClick={() => router.push('/')}
                    />
                </div>
                {isSuccess ? (
                    <div className={classes.contentSuccess}>
                        <div className={classes.titleContainer}>
                            <div className={clsx(classes.textTitle, 'center')}>
                                {t('registerseller:Congratulations')}
                                ,
                                {' '}
                                {username}
                                !
                                <div className={classes.textTitle2}>{t('registerseller:Thank_you_Your_registration_was_successful')}</div>
                            </div>
                        </div>
                        <img className={classes.successImg} src="/assets/img/success-thumbnail.svg" alt="success_thumbnail" />
                        <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                            <Button
                                onClick={() => router.push('/')}
                                variant="contained"
                                className={classes.btn}
                            >
                                <span className={classes.btnText}>
                                    {t('registerseller:Back_to_Login_Page')}
                                </span>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={classes.content}>
                        <div className={classes.titleContainer}>
                            <div className={classes.textTitle}>
                                {t('registerseller:Create_Account')}
                                <div className={classes.textTitle2}>{t('registerseller:Complete_your_Business_Profile')}</div>
                            </div>
                        </div>

                        {createStore ? (
                            <Stepper
                                alternativeLabel
                                activeStep={activeStep}
                                className={clsx(classes.stepper, activeStep === 0 && isDisabledNext && 'disabled')}
                                connector={<QontoConnector />}
                            >
                                {steps.map((step, i) => (
                                    <Step key={i} onClick={() => ((activeStep === 0 && isDisabledNext) ? null : setActiveStep(i))}>
                                        <StepLabel>
                                            {step}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        )
                            : <div style={{ height: 30 }} />}
                        <form onSubmit={onClickSubmit}>
                            <div className="row center-xs start-sm">
                                {renderComponent()}
                                <div className={clsx('col-xs-12 col-sm-12', classes.formField)}>
                                    <Button
                                        onClick={onClickSubmit}
                                        variant="contained"
                                        className={classes.btn}
                                        disabled={isDisabled}
                                    >
                                        <span className={classes.btnText}>
                                            {activeStep === maxSteps ? t('registerseller:Submit_Request') : t('registerseller:Next')}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <div className={classes.containRight} style={{ backgroundImage: "url('/assets/img/swift-bg-new.png')" }} />
        </div>
    );
};

export default RegisterSeller;
