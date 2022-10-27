import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';

const useStyles = makeStyles(() => ({
    paper: {
        padding: '25px 20px',
        borderRadius: 5,
        margin: '20px 0',
        boxShadow: '0px 3px 25px #00000066',
        color: colorText,
    },
    titleTop: {
        color: colorPurple,
        '& .MuiTypography-h6': {
            fontWeight: 'bold !important',
        },
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '48% 4% 48%',
    },
    formControl: {
        width: '100%',
        marginBottom: 20,
        '& .MuiInputLabel-formControl': {
            textTransform: 'uppercase',
            color: colorGray,
            fontSize: 16,
            '&::after': {
                content: "'*'",
                display: 'block',
                position: 'absolute',
                top: -9,
                right: -9,
                color: colorPurple,
                fontSize: 20,
            },
        },
        '& .MuiSelect-select.MuiSelect-select': {
            fontSize: 14,
            fontFamily: font,
        },
        '&.disabled': {
            '& .MuiSelect-select.MuiSelect-select': {
                fontSize: 14,
                fontFamily: font,
                color: colorGray,
            },
        },
    },
    autocompleteRoot: {
        paddingTop: 20,
    },
    fieldInput: {
        '& .MuiInputBase-input': {
            paddingTop: 20,
            width: '100%',
        },
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
    },
    formFieldButton: {
        paddingLeft: 20,
    },
    fieldPhoneContainer: {
        '& .form-control': {
            backgroundColor: 'transparent',
            width: '100%',
            border: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.54)',
            borderRadius: 0,
            '&:focus': {
                border: 'none',
                borderBottom: '2px solid black',
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
        marginBottom: 20,
    },
}));

export default useStyles;
