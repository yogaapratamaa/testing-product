import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY, PRIMARY_SOFT } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    contentDropFile: {
        '& .dropzone': {
            display: 'grid',
        },
    },
    btn: {
        border: `1.5px solid ${PRIMARY}`,
        backgroundColor: 'transparent',
        color: PRIMARY,
        '&:hover': {
            backgroundColor: 'transparent !important',
        },
        margin: '10px 15px',
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 10,
            },
            margin: '5px 0px',
        },
    },
    textNoFile: {
        color: PRIMARY_SOFT,
        padding: '0px 10px',
        marginTop: 30,
    },
    fileList: {
        listStyle: 'none',
        padding: '0px 10px',
        marginTop: 30,
    },
}));

export default useStyles;
