import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_LIGHT } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    contentDropFile: {
        '& .dropzone': {
            display: 'inline-block',
            width: '100%',
        },
    },
    btn: {
        borderRadius: 6,
        backgroundColor: 'transparent',
        textTransform: 'none',
        color: GRAY_LIGHT,
        minHeight: 42,
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        padding: '6px 15px',
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 10,
            },
            margin: '5px 0px',
        },
        '& .MuiButton-label': {
            justifyContent: 'left',
        },
        '&.error': {
            border: '1px solid red',
        },
    },
    textFile: {
        color: GRAY_LIGHT,
        marginLeft: 10,
        fontSize: 12,
        textAlign: 'left',
        width: '100%',

    },
    errorText: {
        color: 'red',
        fontSize: '0.75rem',
        marginTop: 5,
    },
    fileName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '50%',
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    icon: {
        height: 21,
    },
}));

export default useStyles;
