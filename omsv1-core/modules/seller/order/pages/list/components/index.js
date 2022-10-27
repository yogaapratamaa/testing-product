/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Grid from '@material-ui/core/Grid';

import { formatPrice } from '@helper_currency';
import CardList from '@sellermodules/order/pages/list/components/ListCard';
import useStyles from '@sellermodules/order/pages/list/components/style';

const OrderListContent = (props) => {
    const router = useRouter();
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const { data, loading, getSellerOrders, t, dataProvider } = props;
    const orderList = (data && data.getSellerOrders && data.getSellerOrders.items) || [];
    const orderTotal = (data && data.getSellerOrders && data.getSellerOrders.total_count) || 0;

    const columns = [
        { field: 'id', hidden: true },
        { field: 'order_date', sortable: true, hidden: true, initialSort: 'DESC' },
        { field: 'picture' },
        { field: 'address', headerName: t('sellerorder:Address') },
        { field: 'total', headerName: t('sellerorder:Order_Total') },
        { field: 'expedition', headerName: t('sellerorder:Expedition') },
        { field: 'receipt', headerName: t('sellerorder:Receipt_Number') },
    ];

    const rows = orderList.map((order) => ({
        ...order,
        id: order.entity_id,
        header: () => (
            <div className={classes.head}>
                <div>{order.status.label}</div>
                <div className={clsx(classes.divider, 'slash', 'hidden-mobile')} />
                <span className={clsx(classes.divider, 'primary')}>{order.order_number}</span>
                <div className={clsx(classes.divider, 'slash', 'hidden-mobile')} />
                <div className={clsx(classes.divider, 'slash')}>
                    <PersonOutlineIcon />
                    <div className={clsx(classes.divider, 'space')} />
                    {order.customer.name}
                </div>
                <div className={clsx(classes.divider)}>
                    <ScheduleIcon />
                    <div className={clsx(classes.divider, 'space')} />
                    {order.order_date}
                </div>
            </div>
        ),
        picture: () => (
            <Grid container spacing={2} className={classes.imgContainer}>
                <Grid item>
                    <div
                        className={classes.img}
                        style={{ backgroundImage: `url(${order.item_preview.items.image || '/assets/img/placeholder_image.jpg'})` }}
                        alt="ord-img"
                    />
                </Grid>
                <Grid item xs={12} sm container direction="column" spacing={2}>
                    <Grid item xs>
                        {order.item_preview.items.name}
                    </Grid>
                    <Grid item>
                        {`${order.item_preview.items.qty} x ${formatPrice(order.item_preview.items.price, 'IDR')}`}
                    </Grid>
                </Grid>
            </Grid>
        ),
        address: () => (
            <div>
                {order.item_preview.items.name}
                <br />
                {order.shipping_address.region}
            </div>
        ),
        total: order.grand_total,
        expedition: `${order.expedition.provider || ''} - ${order.expedition.service || ''}`,
        receipt: order.tracks?.track_number,
        footer: order.total_item_count > 1 ? `+ ${order.total_item_count - 1} Other Products` : '',
    }));

    const dataTabs = [
        { label: t('sellercatalog:All_Orders'), value: 'all' },
        { label: t('sellercatalog:New_Order'), value: 'new' },
        { label: t('sellercatalog:Confirmed'), value: 'confirmed' },
        { label: t('sellercatalog:Ready_to_Ship'), value: 'ready' },
        { label: t('sellercatalog:In_Delivery'), value: 'delivery' },
        { label: t('sellercatalog:Order_Shipped'), value: 'shipped' },
        { label: t('sellercatalog:Order_Delivered'), value: 'delivered' },
    ];

    const actions = [
        {
            label: t('creditmemos:Print_Label'),
            message: t('creditmemos:Ready_for_print_'),
            onClick: () => {
                const checkedIds = checked.map((check) => check.id);
                window.open(`/seller/order/printlabel/${checkedIds.join('/')}`);
            },
            showMessage: false,
        },
        {
            label: t('creditmemos:Print_Invoice'),
            message: t('creditmemos:Ready_for_print_'),
            onClick: () => {
                const checkedIds = checked.map((check) => check.id);
                window.open(`/seller/order/printinvoice/${checkedIds.join('/')}`);
            },
            showMessage: false,
        },
    ];

    return (
        <CardList
            header={t('sellercatalog:Order_List')}
            columns={columns}
            getRows={getSellerOrders}
            actions={actions}
            rows={rows}
            loading={loading}
            count={orderTotal}
            showCheckbox
            searchPlaceholder={t('common:Search_for_buyer’s_name_product_receipt_number_or_invoice')}
            useTabs
            dataTab={dataTabs}
            handleClickRow={(row) => router.push(`/seller/order/detail/${row.id}`)}
            t={t}
            dataProvider={dataProvider}
            handleChecked={(row) => setChecked(row)}
        />
    );
};

export default OrderListContent;
