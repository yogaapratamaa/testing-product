/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useRouter } from 'next/router';
import useStyles from '@modules/configurationmarketplacefeature/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('marketplacefeatureconfiguration:Marketplace_Feature_Configuration')}</h2>
        </div>
    );
};

export default HeaderContent;
