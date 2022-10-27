import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, PRIMARY } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: 960,
        },
        width: ' 100%',
        alignSelf: 'center',
    },
    boxField: {
        marginTop: '20px',
    },
    colorPrimary: {
        color: PRIMARY,
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1,
    },
    appBarBottom: {
        bottom: 0,
        top: 'auto',
        backgroundColor: 'white',
    },
    pageTitle: {
        marginBottom: 0,
    },
    address_shipping: {
        padding: 15,
        // ...CreatePadding(15, 15, 15, 15),
        width: '100%',
        margin: 0,
    },
    address_billing: {
        padding: '20px 15px',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    address_title: {
        color: PRIMARY,
        fontSize: '12px',
        fontWeight: '700',
        marginBottom: '5px',
    },
    address_content: {
        fontSize: '12px',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        paddingBottom: '15px',
    },
    address_text: {
        fontSize: '12px',
    },
    address_edit: {
        cursor: 'pointer',
        marginLeft: '57.99px',
        textDecoration: 'underline',
        fontSize: '12px',
    },
    address_action: {
        padding: '15px',
    },
    address_add: {
        backgroundColor: 'white',
        boxShadow: 'none',
        border: '1px solid black',
        fontSize: '12px',
    },
    address_save: {
        width: '100%',
        backgroundColor: PRIMARY,
        color: 'white',
        textTransform: 'uppercase',
    },
    address_drawer: {
        left: 0,
        width: '100%',
    },
    address_form: {
        padding: '0 15px 15px 15px',
        // overflowY: 'auto',
        [theme.breakpoints.up('sm')]: {
            height: '80vh',
        },
        '& .MuiFormControl-root': {
            display: 'flex',
        },
    },
    form_input: {
        marginBottom: '25px',
    },
    addBtn: {
        width: '80%',
        margin: '10px 15px',
    },
    boxMap: {
        margin: '30px 0 30px 0',
        // ...CreateMargin(0, 0, 60, 0),
        height: 'auto',
    },
    fontWhite: {
        color: 'white',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        textAlign: 'center',
    },
    buttonProgress: {
        color: PRIMARY,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    headerForm: {
        display: 'flex',
        justifyContent: 'center',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    closeBtn: {
        right: 10,
        top: 10,
        position: 'absolute',
        cursor: 'pointer',
    },
}));

export default useStyles;
