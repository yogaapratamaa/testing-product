/* eslint-disable import/prefer-default-export */
export const optionsReturn = () => [
    {
        aclCode: 'oms_v2_returns',
        key: 'returnlist',
        label: 'return',
        url: '/return',
        children: [
            {
                aclCode: 'oms_v2_return_request',
                key: 'returnrequest',
                label: 'return request',
                url: '/returnrequest',
            },
            // {
            //     aclCode: 'oms_lite_rma_manage',
            //     key: 'managerma',
            //     label: t('menu:Manage_RMA'),
            //     url: '/return/managerma',
            // },
            // {
            //     aclCode: 'oms_lite_rma_statuses',
            //     key: 'rmastatuses',
            //     label: t('menu:RMA_Statuses'),
            //     url: '/return/rmastatuses',
            // },
        ],
    },
];
