import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    error: {
        color: '#000',
        background: '#fff',
        // fontFamily:
        // '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        margin: 0,
    },
    wrapper: {
        margin: 0,
    },
    desc: {
        display: 'inline-block',
        textAlign: 'left',
        lineHeight: '49px',
        height: '49px',
        verticalAlign: 'middle',
    },
    h1: {
        display: 'inline-block',
        borderRight: '1px solid rgba(0, 0, 0,.3)',
        margin: 0,
        marginRight: '20px',
        padding: '8px 23px 8px 0',
        fontSize: '24px',
        fontWeight: 500,
        verticalAlign: 'top',
    },
    h2: {
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: 'inherit',
        margin: 0,
        padding: 0,
    },
    actions: {
        marginTop: 60,
    },
}));

export default useStyles;
