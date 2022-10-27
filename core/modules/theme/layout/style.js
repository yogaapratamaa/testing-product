import { makeStyles } from '@material-ui/core/styles';

import { PRIMARY } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    contentNoHeader: {
        flexGrow: 1,
        padding: 0,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        marginTop: '30px',
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    progressContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    progress: {
        color: PRIMARY,
        position: 'absolute',
        left: '45%',
        top: '20%',
    },
}));

export default useStyles;
