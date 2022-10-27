/* eslint-disable import/prefer-default-export */
export const optionsShipment = () => [
    {
        aclCode: 'oms_v2_shipment',
        key: 'shipment',
        label: 'shipment',
        url: '/shipment',
        children: [
            {
                aclCode: 'oms_v2_shipment_detail',
                key: 'shipmentdetail',
                label: 'Shipment Detail',
                url: '/shipment/edit',
            },
            // {
            //     aclCode: 'shipment_pickup_dashboard',
            //     key: 'storepickup',
            //     label: t('menu:Store_Pickup'),
            //     url: '/shipment/storepickup',
            // },
            // {
            //     aclCode: 'shipment_curbside_pickup',
            //     key: 'curbpickup',
            //     label: t('menu:Curbside_Pickup'),
            //     url: '/shipment/curbpickup',
            // },
            // {
            //     aclCode: 'shipment_delivery_dashboard',
            //     key: 'homedelivery',
            //     label: t('menu:Home_Delivery'),
            //     url: '/shipment/homedelivery',
            // },
            // {
            //     aclCode: 'shipment_marketplace_dashboard',
            //     key: 'shipmentmarketplace',
            //     label: t('menu:Marketplace'),
            //     url: '/shipment/shipmentmarketplace',
            // },
        ],
    },
];
