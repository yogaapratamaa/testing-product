/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/return/pages/list/components/Header/style';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumb from '@common_breadcrumb';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    const handleClick = () => {
        // eslint-disable-next-line no-console
        console.log('handleclick');
    };
    return (
        <div className={classes.headerContainer}>
            <Button
                buttonType="secondary"
                className={classes.buttonAdd}
                onClick={() => router.push('/return/newpage')}
                // yoga testing form
            >
                New Return Request
            </Button>
        </div>
    );
};

export default HeaderContent;
