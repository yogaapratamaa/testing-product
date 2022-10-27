import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT, TEXT_COLOR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .left': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiIconButton-root': {
                padding: 0,
                paddingRight: 10,
            },
            '& .MuiSvgIcon-root': {
                fill: PRIMARY_DARK,
                height: 30,
                width: 'auto',
            },
            '& .MuiIconButton-root:hover': {
                background: 'none',
            },
        },
        marginBottom: 20,
    },
    paper: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
        marginBottom: 20,
        '&.nopadding': {
            padding: '30px 0',
        },
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        fontSize: 18,
        '&.paper': {
            marginBottom: 30,
        },
        '&.padding': {
            padding: 30,
            paddingTop: 0,
        },
    },
    itemsGrid: {
        padding: '0 30px',
        '&.nopadding': {
            padding: 0,
        },
    },
    divTotalEnd: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end',
        },
    },
    subtitle: {
        marginBottom: 10,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        fontSize: 14,
        '&.primary': {
            color: PRIMARY,
        },
        '&.gray': {
            color: TEXT_COLOR,
            fontWeight: 'normal',
        },
    },
    subText: {
        color: TEXT_COLOR,
        fontSize: 14,
        '&.primary': {
            color: PRIMARY,
        },
        '&.dark': {
            color: PRIMARY_DARK,
        },
    },
    btn: {
        background: PRIMARY,
        borderRadius: 6,
        padding: 6,
        width: '100%',
        height: 52,
        '&:hover': {
            background: PRIMARY_DARK,
        },
        margin: '10px 0',
    },
    btnText: {
        fontSize: 15,
    },
    btnContainer: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
    },

    table: {
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: GRAY_LIGHT,
        marginBottom: 20,
        '& .first': {
            [theme.breakpoints.up('md')]: {
                paddingLeft: 40,
            },
        },
    },
    tr: {
        verticalAlign: 'top',
        '&.head': {
            backgroundColor: TABLE_GRAY,
            height: 45,
        },
        padding: '0 20px',
        borderColor: 'transparent',
    },
    th: {
        textAlign: 'left',
        color: PRIMARY_DARK,
        fontWeight: 'bold',
    },
    td: {
        color: PRIMARY_DARK,
        border: '0',
        '&.status': {
            textTransform: 'capitalize',
        },
    },
    notePaper: {
        boxShadow: 'none',
        border: '1px solid',
        borderColor: TABLE_GRAY,
        width: 300,
        padding: 10,
        color: TEXT_COLOR,
        fontSize: 13,
    },
    gridNote: {
        flexWrap: 'nowrap',
    },
    stepContainer: {
        '&.MuiStepper-root': {
            [theme.breakpoints.down('sm')]: {
                padding: '0',
            },
        },
        borderBottom: '1px solid black',
    },
}));

export default useStyles;
