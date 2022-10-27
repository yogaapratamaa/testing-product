import { makeStyles } from '@material-ui/core/styles';
import { GRAY_SECONDARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    productListContainer: {
        borderTop: '1px solid gray',
        borderBottom: '1px solid gray',
        marginTop: '0.82em',
        padding: '0.82em 0',
    },
    fieldRoot: {
        '& .MuiOutlinedInput-input': {
            padding: '8.5px 14px',
        },
    },
    loading: {
        display: 'flex',
        color: GRAY_SECONDARY,
        fontWeight: 500,
        fontStyle: 'italic',
        justifyContent: 'center',
        padding: '10px 0',
    },
}));

export default useStyles;
