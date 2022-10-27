/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import useStyles from '@modules/irispayoutapproval/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t, setShow } = props;
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('irispayoutapproval:Iris_Payout_Approval')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => setShow(true)}
            >
                {t('vendor:viewBalance')}
            </Button>
        </div>
    );
};

export default HeaderContent;
