import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, BLACK, GRAY_LIGHT, TABLE_GRAY, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '16px',
            textAlign: 'right',
            display: 'flex',
            justifyContent: 'space-between',
            borderLeft: `1px solid ${GRAY_LIGHT}`,
            borderRight: `1px solid ${GRAY_LIGHT}`,
        },
        '& .records-found': {
            // padding: '12px 0',
            float: 'left',
            marginLeft: '12px',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'left',
            },
        },
        '& .top-item': {
            display: 'inline-block',
            marginRight: '12px',
            '& .MuiButton-text': {
                border: '1px solid',
                borderColor: TABLE_GRAY,
                color: BLACK,
                textTransform: 'capitalize',
            },
        },
        '& .top-item.records-found': {
            textAlign: 'initial',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
                float: 'none',
            },
        },
        '& .boxColumn': {
            display: 'inline-block',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
        },
        '& .MuiCollapse-wrapperInner .col-filter': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            '& .MuiAutocomplete-root': {
                [theme.breakpoints.down('xs')]: {
                    width: '100% !important',
                },
            },
        },
        '& .MuiCollapse-wrapperInner .col-filter .MuiTextField-root': {
            marginTop: '10px',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: '8.5px 14px',

        },
    },
    btn: {
        // borderRadius: 20,
        background: 'unset',
        boxShadow: 'none',
        textTransform: 'capitalize',
        color: BLACK,
        border: '1px solid',
        borderColor: TABLE_GRAY,
        // padding: '5px 16px 5px 8px',
        height: 35,
        '&:hover': {
            background: 'unset',
            boxShadow: 'none',
        },
        '&.filter': {
            borderColor: GRAY_LIGHT,
            color: BLACK,
            // background: GRAY_LIGHT,
            margin: '10px 0',
        },
        '& .btnIcon': {
            width: 30,
            height: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '5px',
            minWidth: 'unset',
            width: 40,
        },
    },
    filterBtn: {
        color: BLACK,
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    mainTable: {
        overflowX: 'scroll',
    },
    toogleColumn: {
        '& .MuiCollapse-entered': {
            borderTop: `1px solid  ${GRAY_LIGHT}`,
            borderBottom: `1px solid  ${GRAY_LIGHT}`,
            marginBottom: '10px',
        },
    },
    tableContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            display: 'block',
            marginLeft: '0px',
            marginRight: '0px',
        },
    },
    loading: {
        display: 'flex',
        color: PRIMARY,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
    tablePagination: {
        display: 'flex',
        justifyContent: 'right',
        border: `1px solid ${GRAY_LIGHT}`,
        '& label': {
            color: BLACK,
            padding: 10,
        },
        '& .MuiNativeSelect-select.MuiNativeSelect-select': {
            padding: '6px 20px 7px 5px',
        },
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
        marginTop: 10,
    },
    fieldInput: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
        borderRadius: 20,
        width: '100%',
        minWidth: 400,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        '&.MuiInput-underline:before': {
            display: 'none',
        },
        '&.MuiInput-underline:after': {
            display: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            fontSize: 14,
        },
    },
    search: {
        border: '1px solid',
        borderColor: TABLE_GRAY,
        borderRadius: 4,
        backgroundColor: WHITE,
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        height: 36,
        // marginBottom: 10,
    },
    searchIcon: {
        paddingLeft: 16,
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        color: PRIMARY,
    },

}));

export default useStyles;
