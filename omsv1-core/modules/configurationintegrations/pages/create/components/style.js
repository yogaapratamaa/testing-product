import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';

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
    },
    titleSmall: {
        fontFamily: font,
        color: colorGray,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 18,
    },
    formField: {
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        padding: 0,
        alignItems: 'baseline',
        paddingBottom: 16,
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
            width: 140,
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
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: '90%',
        verticalAlign: 'middle',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
        '& .MuiOutlinedInput-input': {
            padding: '17.5px 14px',
        },
    },
    helper: {
        fontSize: 13,
        paddingLeft: 10,
        paddingTop: 5,
    },
}));

export default useStyles;
