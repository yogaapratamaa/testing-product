import { makeStyles } from '@material-ui/core/styles';
import {
    TABLE_GRAY,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        paddingBottom: '10px',
        borderBottom: `1px solid ${TABLE_GRAY}`,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 17,
            paddingRight: 17,
        },
        '& .MuiTypography-body1': {
            fontSize: '1.5rem',
            display: 'inline-block',
        },
    },
    title: {
        display: 'inline',
        fontFamily: font,
        fontSize: 24,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            margin: 0,
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 16,
        width: '50%',
        height: '50%',
        '@media (max-width: 767px )': {
            width: '90%',
        },
        textAlign: 'center',
    },
    bodyList: {
        color: 'black',
        margin: 0,
        paddingBottom: 5,
        position: 'relative',
        fontWeight: 600,
    },
    fieldRoot: {
        '& .MuiOutlinedInput-input': {
            padding: '8.5px 14px',
        },
    },
    btnAction: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
    },
    btn: {
        width: '92%',
        margin: '10px 15px',
    },
}));

export default useStyles;
