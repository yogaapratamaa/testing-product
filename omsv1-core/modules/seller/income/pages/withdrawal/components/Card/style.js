import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, TABLE_GRAY,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: 'none',
        padding: '15px 20px',
        borderRadius: 8,
        marginTop: 20,
        border: `1px solid ${GRAY_LIGHT}`,
    },
    gridContainer: {
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 13,
        '&.big': {
            fontSize: 15,
        },
    },
    bankImg: {
        width: 102,
        height: 50,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundOrigin: 'content-box',
        backgroundPosition: 'center',
        display: 'flex',
        padding: 12,
        justifyContent: 'center',
        '& .bank-place': {
            width: 24,
            height: 24,
        },
        marginLeft: 10,
        border: `1px solid ${TABLE_GRAY}`,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 20,
        },
    },
    btn: {
        backgroundColor: PRIMARY,
        color: 'white',
        width: 20,
        height: 20,
        '& .MuiSvgIcon-root': {
            width: 18,
            height: 18,
        },
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            color: 'white',
        },
    },
    radio: {
        color: PRIMARY,
        '& .MuiSvgIcon-root': {
            width: 24,
            height: 24,
        },
        '&.MuiRadio-colorSecondary.Mui-checked': {
            color: `${PRIMARY} !important`,
        },
    },
}));

export default useStyles;
