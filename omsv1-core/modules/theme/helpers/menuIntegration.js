/* eslint-disable import/prefer-default-export */
export const optionsIntegration = (t) => [
    {
        aclCode: 'header_integration',
        key: 'integration',
        label: t('menu:Integration'),
        children: [
            {
                aclCode: 'ecommerce_channels',
                key: 'ecommerce_channels',
                label: t('menu:Ecommerce_Channel'),
                url: '/integration/ecommercechannel',
                notInAcl: true,
            },
            {
                aclCode: 'offline_channels',
                key: 'offline_channels',
                label: t('menu:Offline_Channel'),
                url: '/integration/offlinechannel',
                notInAcl: true,
            },
        ],
    },
];
