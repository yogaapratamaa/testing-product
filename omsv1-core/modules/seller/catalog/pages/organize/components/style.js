import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TEXT_COLOR, GRAY_LIGHT, SECONDARY,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 3px 15px #4D2F821A',
        padding: 30,
        paddingBottom: 50,
        borderRadius: 8,
        marginBottom: 40,
    },
    title: {
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 20,
    },
    text: {
        marginTop: 20,
        fontSize: 13,
        color: TEXT_COLOR,
        marginBottom: 20,
        '&.primary': {
            marginTop: 0,
            color: PRIMARY,
        },
    },
    boxParent: {
        margin: 0,
        width: '100%',
    },
    box: {
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: 8,
        padding: 20,
        height: '100%',
    },
    btn: {
        borderRadius: 8,
        background: 'white',
        boxShadow: 'none',
        textTransform: 'capitalize',
        borderColor: PRIMARY,
        color: PRIMARY,
        padding: '9px 21px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: 'white',
            boxShadow: 'none',
            color: SECONDARY,
            borderColor: SECONDARY,
        },
        [theme.breakpoints.down('md')]: {
            minHeight: 42,
        },
    },
}));

export default useStyles;
