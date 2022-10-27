/* eslint-disable no-unused-vars */
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';
import { loaderImage } from '@config';
import PropTypes from 'prop-types';
import { useTranslation } from '@i18n';
import {
    WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: WHITE,
    },
    '@keyframes spiner': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
    loader: {
        width: 60,
        height: 60,
        animationName: '$spiner',
        animation: '1.5s linear infinite',
    },
    loaderGif: {
        width: 60,
        height: 50,
    },
}));

const CustomBackdrop = (props) => {
    const { t } = useTranslation(['common']);
    const { open, className } = props;
    const styles = useStyles();
    const backdroptStyle = classNames(styles.backdrop, className);
    let image;
    const extention = loaderImage.split('.').pop();
    if (extention === '' || !extention) {
        image = <img src={loaderImage} alt={loaderImage} />;
    } else if (
        extention === 'png'
        || extention === 'jpg'
        || extention === 'jpeg'
    ) {
        image = (
            <img
                className={styles.loader}
                src={loaderImage}
                alt={loaderImage}
            />
        );
    } else {
        image = <img src={loaderImage} alt={loaderImage} className={styles.loaderGif} />;
    }
    return (
        <Backdrop className={backdroptStyle} open={open}>
            {!loaderImage || loaderImage === '' ? <CircularProgress /> : image}
        </Backdrop>
    );
};

CustomBackdrop.propTypes = {
    open: PropTypes.bool,
    className: PropTypes.string,
};

CustomBackdrop.defaultProps = {
    open: false,
    className: '',
};

export default CustomBackdrop;
