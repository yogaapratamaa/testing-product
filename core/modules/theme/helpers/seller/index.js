/* eslint-disable import/prefer-default-export */
export const optionsSeller = (t) => [
    {
        key: 'order',
        label: t('menu:Order_List'),
        url: '/seller/order',
    },
    {
        key: 'catalog',
        label: t('menu:Catalog'),
        url: '/seller/catalog',
    },
    {
        key: 'stock',
        label: t('menu:Stock'),
        url: '/seller/stock',
    },
    // {
    //     key: 'discussion',
    //     label: t('menu:Discussion'),
    //     url: '/seller/discussion',
    // },
    // {
    //     key: 'review',
    //     label: t('menu:Review'),
    //     url: '/seller/review',
    // },
    {
        key: 'storesetting',
        label: t('menu:Store_Setting'),
        url: '/seller/storesetting',
    },
    {
        key: 'income',
        label: t('menu:Income'),
        url: '/seller/income/balance',
    },
    // {
    //     key: 'promotion',
    //     label: t('menu:Promotion'),
    //     url: '/seller/promotion',
    // },
];

export default optionsSeller;
