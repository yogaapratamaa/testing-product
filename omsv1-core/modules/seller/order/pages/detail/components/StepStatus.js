import React from 'react';
import clsx from 'clsx';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, TABLE_GRAY,
} from '@theme_color';
import { breakPointsUp } from '@helper_theme';

import useStyles from '@sellermodules/order/pages/detail/components/style';

const Connector = withStyles((theme) => ({
    alternativeLabel: {
        top: 44,
        [theme.breakpoints.down('sm')]: {
            top: 11,
        },
    },
    active: {
        '& $line': {
            backgroundColor: PRIMARY,
        },
    },
    completed: {
        '& $line': {
            backgroundColor: PRIMARY,
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
}))(StepConnector);

const ColorLabel = withStyles({
    label: {
        fontWeight: 'bold',
        color: PRIMARY_DARK,
        '&$active': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
        '&$completed': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
    },
    alternativeLabel: {
        color: GRAY_LIGHT,
    },
    active: {
        color: PRIMARY_DARK,
    },
    completed: {
        color: PRIMARY_DARK,
    },
})(StepLabel);

const useStepStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: TABLE_GRAY,
        zIndex: 1,
        color: '#fff',
        width: 100,
        height: 100,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: 75,
            height: 75,
        },
    },
    bgImage: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: '50%',
        backgroundPosition: 'center',
        width: 100,
        height: 100,
    },
    active: {
        backgroundColor: PRIMARY,
    },
    completed: {
        backgroundColor: PRIMARY,
    },
}));

function ColorlibStepIcon(props) {
    const classes = useStepStyles();
    const { active, completed, icon } = props;

    const icons = {
        1: '/assets/img/seller_order_status/Confirm.svg',
        2: '/assets/img/seller_order_status/Processing.svg',
        3: '/assets/img/seller_order_status/Shipping.svg',
        4: '/assets/img/seller_order_status/Complete.svg',
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}

        >
            <div
                className={clsx(classes.bgImage)}
                style={{
                    backgroundImage: `url(${icons[String(icon)]})`,
                }}
            />
        </div>
    );
}

export default function CustomizedSteppers(props) {
    const { t, data } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('md');

    const stepNumber = () => {
        switch (data.status?.code) {
        case 'new':
            return 0;
        case 'ready_for_ship':
            return 1;
        case 'in_delivery':
            return 2;
        case 'order_delivered':
        case 'closed':
        case 'canceled':
            return 3;
        default:
            return 0;
        }
    };

    const steps = [t('sellerorder:New_Order'), t('sellerorder:Ready_for_Ship'),
        t('sellerorder:In_Delivery'), t('sellerorder:Order_Delivered')];

    return (
        isDesktop ? (
            <Stepper className={classes.stepContainer} alternativeLabel activeStep={stepNumber()} connector={<Connector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <ColorLabel StepIconComponent={ColorlibStepIcon}>
                            {label}
                        </ColorLabel>
                    </Step>
                ))}
            </Stepper>
        )
            : (
                <Stepper className={classes.stepContainer} alternativeLabel activeStep={stepNumber()} connector={<Connector />}>
                    <Step key={steps[stepNumber()]}>
                        <ColorLabel StepIconComponent={ColorlibStepIcon}>
                            {steps[stepNumber()]}
                        </ColorLabel>
                    </Step>
                </Stepper>
            )
    );
}
