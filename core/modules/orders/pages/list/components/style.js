import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_SOFT, PRIMARY_DARK, GREEN, GREEN_SOFT,
    YELLOW, YELLOW_SOFT, ORANGE, ORANGE_SOFT, RED, RED_SOFT, GRAY_LIGHT, BLACK, PURPLE, PINK,

} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    orderContainer: {
        paddingBottom: 200,
    },
    fieldInput: {
        '& .MuiFormControl-root': {
            padding: '8.5px 14px',
        },
    },
    statusRow: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        alignItems: 'center',
        '&.unbold': {
            fontWeight: 'unset',
        },
    },
    statusIcon: {
        width: 36,
        height: 'auto',
        marginRight: 12,
        [theme.breakpoints.down('xs')]: {
            width: 30,
            marginRight: 5,
        },
    },
    loading: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        paddingTop: 20,
    },
    linkButton: {
        textDecoration: 'none',
        color: PRIMARY,
    },
    statusNew: {
        border: '1px solid',
        borderRadius: 20,
        padding: '2px 10px',
        textAlign: 'center',
        backgroundColor: GREEN_SOFT,
        borderColor: GREEN,
        color: GREEN,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusProcessing: {
        border: '1px solid',
        borderRadius: 20,
        padding: '2px 10px',
        textAlign: 'center',
        backgroundColor: YELLOW_SOFT,
        borderColor: YELLOW,
        color: YELLOW,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusReady: {
        border: '1px solid',
        borderRadius: 20,
        padding: '2px 10px',
        textAlign: 'center',
        backgroundColor: ORANGE_SOFT,
        borderColor: ORANGE,
        color: ORANGE,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusShipped: {
        border: '1px solid',
        borderRadius: 20,
        padding: '2px 10px',
        textAlign: 'center',
        backgroundColor: PINK,
        borderColor: PURPLE,
        color: PURPLE,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusFailed: {
        border: '1px solid',
        borderRadius: 20,
        padding: '2px 10px',
        textAlign: 'center',
        backgroundColor: RED_SOFT,
        borderColor: RED,
        color: RED,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusCancelled: {
        border: '1px solid',
        borderRadius: 20,
        padding: '2px 10px',
        textAlign: 'center',
        backgroundColor: GRAY_LIGHT,
        borderColor: BLACK,
        color: BLACK,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusDelivered: {
        border: '1px solid',
        borderRadius: 20,
        padding: '2px 10px',
        textAlign: 'center',
        backgroundColor: PRIMARY_SOFT,
        borderColor: PRIMARY_DARK,
        color: PRIMARY_DARK,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusNotFound: {
        border: '1px solid',
        borderRadius: 20,
        padding: '2px 10px',
        textAlign: 'center',
        backgroundColor: PRIMARY_SOFT,
        borderColor: GREEN,
        color: GREEN,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusCompleted: {
        border: '1px solid',
        borderRadius: 20,
        padding: '2px 10px',
        textAlign: 'center',
        backgroundColor: YELLOW_SOFT,
        borderColor: PURPLE,
        color: PURPLE,
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },

}));

export default useStyles;
