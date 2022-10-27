import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_LIGHT, GRAY_BG, PRIMARY_DARK } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    btn: {
        borderRadius: 6,
        backgroundColor: GRAY_BG,
        textTransform: 'none',
        color: PRIMARY_DARK,
        height: 160,
        width: 160,
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        '&:hover': {
            backgroundColor: GRAY_BG,
            boxShadow: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 12,
            },
            margin: '5px 0px',
        },
        '& .MuiButton-label': {
            display: 'block',
            justifyContent: 'center',
        },
        '&.error': {
            border: '1px solid red',
        },
    },
    textFile: {
        color: PRIMARY_DARK,
        fontSize: 12,
        textAlign: 'center',
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
        display: 'inline-block',
        verticalAlign: 'middle',
        color: PRIMARY_DARK,
        fontSize: 12,
        textAlign: 'center',
        width: 150,
    },
    icon: {
        height: 21,
    },
    imgGroup: {
        margin: 10,
        padding: '10px 0',
        textAlign: 'center',
        height: 200,
    },
    imgContainer: {
        position: 'relative',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        padding: 0,
        width: 160,
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    img: {
        maxWidth: 150,
        maxHeight: 150,
        width: 'auto',
        height: 'auto',
        display: 'block',
    },
    trashIcon: {
        position: 'absolute',
        height: 16,
        width: 'auto',
        cursor: 'pointer',
        right: '5%',
        bottom: '5%',
    },
    typeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 10,
        paddingRight: '10%',
        width: 100,
    },
    labelType: {
        backgroundColor: GRAY_LIGHT,
        borderRadius: 20,
        marginBottom: 10,
        marginRight: 10,
        padding: '5px 10px',
        width: 'fit-content',
        fontSize: 12,
        textTransform: 'capitalize',
    },
}));

export default useStyles;
