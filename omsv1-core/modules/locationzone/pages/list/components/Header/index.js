/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/locationzone/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('locationzone:Location_Zone')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/oms/locationzone/create')}
            >
                {t('locationzone:Add_New_Zone')}
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/oms/locationzone/import')}
            >
                {t('locationzone:Upload_New_Zone')}
            </Button>
        </div>
    );
};

export default HeaderContent;
