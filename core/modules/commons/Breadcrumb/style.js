import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 20,
        '& a': {
            cursor: 'pointer',
        },

        '& p': {
            marginLeft: 0,
        },
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        marginTop: '32px !important',
        textTransform: ' capitalize',
        '& a': {
            fontSize: '1.5rem',
        },
    },
    containerMobile: {
        [theme.breakpoints.down('xs')]: {
            padding: '10px 17px 0 17px',
        },
    },
    breadcrumbActive: {
        textTransform: 'capitalize',
        '&:hover': {
            color: PRIMARY_DARK,
            borderBottom: `1px solid ${PRIMARY_DARK}`,
            marginBottom: '-1px',
        },
    },
}));

export default useStyles;
