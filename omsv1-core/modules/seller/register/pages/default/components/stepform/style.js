import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
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
            backgroundColor: 'white',
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
        },
    },
    textInputPass: {
        width: '100%',
        height: 42,
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: 'white',
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiFormHelperText-root': {
            marginTop: 30,
        },
    },
    textInputMaps: {
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
    },
    formField: {
        padding: 0,
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        color: PRIMARY_DARK,
        marginBottom: 5,
        position: 'relative',
        width: 'fit-content',
        fontWeight: 600,
    },
    required: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: PRIMARY,
            fontSize: 14,
        },
    },
    fieldPhoneContainer: {
        '& .form-control': {
            backgroundColor: 'white',
            borderRadius: 6,
            width: '100%',
            border: 'none',
            borderBottom: 'none',
            height: 42,
            '&:focus': {
                border: 'none',
                borderBottom: `2px solid ${PRIMARY}`,
                boxShadow: 'none',
                '& .special-label': {
                    color: 'black',
                },
            },
        },
    },
    fieldPhoneRoot: {
        width: '100%',
    },
    boxMap: {
        marginBottom: 40,
        width: '100%',
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '& .MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
    },
    recaptcha: {
        display: 'flex',
        justifyContent: 'center',
    },
    termsCondition: {
        color: PRIMARY,
    },
}));

export default useStyles;
