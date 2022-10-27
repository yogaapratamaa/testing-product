/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/shippingcompany/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('shippingcompany:Shipping_Company')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/tada/shippingcompany/create')}
            >
                {t('shippingcompany:Add_Shipping_Company')}
            </Button>
        </div>
    );
};

export default HeaderContent;
