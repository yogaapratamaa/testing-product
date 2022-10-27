/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import Link from 'next/link';
import clsx from 'clsx';
import useStyles from '@common_breadcrumb/style';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useTranslation } from '@i18n';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

const CustomBreadcrumb = ({ data = [] }) => {
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className={clsx(styles.flexContainer, styles.containerMobile)}
        >
            {data.map((breadcrumb, index) => (
                index === data.length - 1
                    ? (
                        <Typography key={index} variant="h5" color="textPrimary">{breadcrumb.label}</Typography>
                    )
                    : (
                        <Link color="inherit" key={index} href={breadcrumb.url} className={styles.breadcrumbActive}>
                            {breadcrumb.label}
                        </Link>
                    )
            ))}
        </Breadcrumbs>
    );
};

export default CustomBreadcrumb;
