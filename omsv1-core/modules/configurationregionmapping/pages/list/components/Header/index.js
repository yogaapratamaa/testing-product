/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/configurationregionmapping/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const { t } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>{t('regionmappingconfiguration:Region_Mapping_Configuration')}</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/configurations/regionmapping/create')}
            >
                {t('regionmappingconfiguration:Add_New_Region_Mapping')}
            </Button>
        </div>
    );
};

export default HeaderContent;
