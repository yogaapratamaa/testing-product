import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, WHITE, GRAY_BG,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    loginContainer: {
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        height: '100vh',
        backgroundColor: GRAY_BG,
        textAlign: ' center',
    },
    swiftOmsLogo: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            '& img': {
                height: 36,
                verticalAlign: 'middle',
            },
            '& h1': {
                fontSize: '12px',
            },
        },
    },
    titleContainer: {
        marginTop: 60,
    },
    textTitle: {
        fontSize: 30,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
    },
    textTitle2: {
        fontSize: 13,
        fontWeight: 400,
        marginTop: 10,
    },
    textInput: {
        width: '100%',
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 15,
            opacity: 1,
        },
    },
    formField: {
        padding: 0,
        paddingBottom: 25,
        position: 'relative',
        '& .MuiInputAdornment-positionStart': {
            marginLeft: 10,
        },
    },
    iconImg: {
        color: PRIMARY,
    },
    headerLogin: {
        [theme.breakpoints.down('xs')]: {
            margin: '20px 20px 0 20px',
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containLeft: {
        width: '48%',
        float: 'left',
        marginTop: 26,
        marginLeft: 21,
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
            width: '100%',
            marginLeft: 0,
        },
    },
    containRight: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        width: '49%',
        float: 'right',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    loginContent: {
        margin: 'auto',
        maxWidth: '35%',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '10%',
            maxWidth: '80%',
        },
    },
    btnLogin: {
        background: PRIMARY,
        borderRadius: 7,
        padding: 6,
        width: '100%',
        height: 52,
        '&:hover': {
            background: PRIMARY_DARK,
        },
    },
    btnLoginText: {
        fontSize: 15,
    },
    btnTextForgot: {
        display: 'flex',
        justifyContent: 'right',
        fontSize: 14,
        marginBottom: 20,
        width: '100%',
        fontWeight: 600,
        '& a': {
            color: PRIMARY_DARK,
            fontWeight: 600,
            textDecoration: 'none',
        },
    },
    btnSignUp: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 14,
        marginBottom: 20,
        width: '100%',
        '& a': {
            color: PRIMARY_DARK,
            fontWeight: 600,
            textDecoration: 'none',
        },
    },
    recaptcha: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default useStyles;
