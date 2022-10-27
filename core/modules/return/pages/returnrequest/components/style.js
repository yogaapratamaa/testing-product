import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
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
            // backgroundColor: WHITE,
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 15,
            opacity: 1,
        },
    },
    // formField: {
    //     padding: 0,
    //     paddingBottom: 25,
    //     position: 'relative',
    //     '& .MuiInputAdornment-positionStart': {
    //         marginLeft: 10,
    //     },
    // },
}));

export default useStyles;
