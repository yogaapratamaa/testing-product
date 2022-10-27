import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    fieldInput: {
        '& .MuiFormControl-root': {
            padding: '8.5px 14px',
        },
    },
    statusRow: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        alignItems: 'center',
        '&.unbold': {
            fontWeight: 'unset',
        },
    },
    statusIcon: {
        width: 36,
        height: 'auto',
        marginRight: 12,
        [theme.breakpoints.down('xs')]: {
            width: 30,
            marginRight: 5,
        },
    },
    loading: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        paddingTop: 20,
    },
    linkButton: {
        textDecoration: 'none',
        color: PRIMARY,
    },
}));

export default useStyles;
