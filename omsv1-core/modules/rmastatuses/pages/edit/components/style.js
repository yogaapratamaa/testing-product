import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
        },
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'flex',
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        width: 300,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: '55%',
            paddingRight: 20,
        },
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: colorPurple,
            fontSize: 20,
            [theme.breakpoints.down('xs')]: {
                left: -12,
            },
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    autocompleteRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
        display: 'inline-flex',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
    },
}));

export default useStyles;
