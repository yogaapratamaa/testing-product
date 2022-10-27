/* eslint-disable no-nested-ternary */
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';

import useStyles from '@sellermodules/order/pages/detail/components/style';

const ItemsTable = (props) => {
    const { t, data } = props;

    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.itemsGrid}>
            <Grid item xs={12} sm={3} md={3}>
                <div className={classes.subtitle}>{t('sellerorder:Payment_Method')}</div>
                <div className={classes.subText}>
                    {data.channel_payment_method || '-'}
                </div>
            </Grid>
            <Grid item xs={12} sm="auto" md={3}>
                <div className={classes.subtitle}>{t('sellerorder:Transaction_ID')}</div>
                <div className={classes.subText}>
                    {data.order_number || '-'}
                </div>
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
                <div className={classes.subtitle}>{t('sellerorder:Transaction_Time')}</div>
                <div className={classes.subText}>
                    {data.order_date || '-'}
                </div>
            </Grid>
            <Grid container spacing={2} item xs={12} sm={12} md={3}>
                <Grid item xs={6} sm={6}>
                    <div className={clsx(classes.subtitle)}>
                        {t('sellerorder:Total')}
                    </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <div className={clsx(classes.subtitle, classes.divTotalEnd)}>
                        {data.subtotal}
                    </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <div className={clsx(classes.subtitle)}>
                        {t('sellerorder:Shipping_Handling')}
                    </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <div className={clsx(classes.subtitle, classes.divTotalEnd)}>
                        {data.shipping_amount}
                    </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <div className={clsx(classes.subtitle)}>
                        {t('sellerorder:Extra_Fee_Insurance')}
                    </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <div className={clsx(classes.subtitle, classes.divTotalEnd)}>
                        {data.extra_fee_amount}
                    </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <div className={clsx(classes.subtitle, 'primary')}>
                        {t('sellerorder:Grand_Total')}
                    </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <div className={clsx(classes.subtitle, 'primary', classes.divTotalEnd)}>
                        {data.grand_total}
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ItemsTable;
