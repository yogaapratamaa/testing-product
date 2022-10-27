import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    TABLE_GRAY, PRIMARY, WHITE, BLACK, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    primary: {
        background: PRIMARY,
        color: WHITE,
        '&:hover': {
            background: PRIMARY,
        },
        padding: '5px 16px',
        fontWeight: 400,
        textTransform: 'capitalize',
    },
    outlined: {
        background: 'transparent',
        border: `1px solid ${TABLE_GRAY}`,
        padding: '5px 16px',
        color: BLACK,
        fontWeight: 400,
        boxShadow: 'none',
        '&:hover': {
            background: 'transparent',
        },
        textTransform: 'capitalize',
    },
    rounded: {
        borderRadius: 20,
        fontWeight: 400,
        textTransform: 'capitalize',
    },
    buttonText: {
        background: 'none',
        color: PRIMARY,
        fontWeight: 600,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        textDecoration: 'underline',
        '&:hover': {
            background: 'none',
            boxShadow: 'none',
            color: PRIMARY,
            textDecoration: 'underline',
        },
    },
    link: {
        background: 'none',
        color: PRIMARY,
        fontWeight: 400,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        '&:hover': {
            background: 'none',
            boxShadow: 'none',
            color: BLACK,
        },
    },
    disabled: {
        borderColor: 'unset',
    },
    secondary: {
        background: GRAY_LIGHT,
        boxShadow: 'none',
        fontWeight: 600,
        textTransform: 'capitalize',

    },
    black: {
        textTransform: 'capitalize',
        color: '#fff',
        background: '#000',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0, 0.7)',
        },
    },
}));

export default useStyles;
