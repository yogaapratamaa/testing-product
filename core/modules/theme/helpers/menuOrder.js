/* eslint-disable import/prefer-default-export */
export const optionsOrder = () => [
    {
        aclCode: 'oms_v2_orders',
        key: 'orderlist',
        label: 'Orders',
        url: '/orders',
        children: [
            {
                aclCode: 'oms_v2_edit_order',
                key: 'editorder',
                label: 'Edit Order',
                url: '/orders/edit',
            },
            {
                aclCode: 'oms_v2_view_order',
                key: 'vieworder',
                label: 'View Order',
                url: '/orders/view',
            },
            // {
            //     aclCode: 'oms_lite_sales_order_queue',
            //     key: 'orderqueue_failed',
            //     label: t('menu:Failed'),
            //     url: '/order/failed',
            // },
            // {
            //     aclCode: 'oms_lite_sales_order_queue',
            //     key: 'orderqueue_order_processing',
            //     label: t('menu:Order_Processing'),
            //     url: '/order/order_processing',
            // },
            // {
            //     aclCode: 'oms_lite_sales_order_queue',
            //     key: 'orderqueue_shipment_processing',
            //     label: t('menu:Shipment_Processing'),
            //     url: '/order/shipment_processing',
            // },
            // {
            //     aclCode: 'oms_lite_sales_order_queue',
            //     key: 'orderqueue_complete',
            //     label: t('menu:Completed'),
            //     url: '/order/complete',
            // },
            // {
            //     aclCode: 'oms_lite_sales_order_queue',
            //     key: 'orderqueue_canceled',
            //     label: t('menu:Canceled'),
            //     url: '/order/canceled',
            // },
            // {
            //     aclCode: 'sales_order_invoice',
            //     key: 'orderqueue_invoice',
            //     label: t('menu:Invoice'),
            //     url: '/order/invoice',
            // },
            // {
            //     aclCode: 'sales_order_queue_bulk_tools',
            //     key: 'orderqueue_bulk_tools',
            //     label: t('menu:Bulk_Tools'),
            //     url: '/order/bulktools',
            // },
            // {
            //     aclCode: 'export_order',
            //     key: 'exportorder',
            //     label: t('menu:Export_Order'),
            //     url: '/order/exportorder',
            // },
            // { aclCode: 'orderreallocation', label: 'Order Reallocation', url: '/sales/orderreallocation' },
        ],
    },
];
