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
    buttonAdd: {
        float: 'right',
        position: 'absolute',
        right: 25,
        top: 140,
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            float: 'left',
            marginTop: 7,
        },
    },
}));

export default useStyles;
