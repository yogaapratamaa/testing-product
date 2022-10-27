/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/marketplace/pages/list/components/Header';

const MarketplaceListContent = (props) => {
    const { data, loading, getMarketplaceList, t } = props;
    const marketplaceList = (data && data.getMarketplaceList && data.getMarketplaceList.items) || [];
    const marketplaceTotal = (data && data.getMarketplaceList && data.getMarketplaceList.total_count) || 0;

    const columns = [
        { field: 'marketplace_code', headerName: t('marketplace:Marketplace_Code'), sortable: true, hideable: true },
        { field: 'marketplace_name', headerName: t('marketplace:Marketplace_Name'), sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'marketplace_code', name: 'marketplace_code', type: 'like', label: t('marketplace:Marketplace_Code'), initialValue: '' },
        { field: 'marketplace_name', name: 'marketplace_name', type: 'like', label: t('marketplace:Marketplace_Name'), initialValue: '' },
    ];

    const rows = marketplaceList.map((marketplace) => ({
        ...marketplace,
    }));
    return (
        <>
            <Header t={t} />
            <Table
                filters={filters}
                rows={rows}
                getRows={getMarketplaceList}
                loading={loading}
                columns={columns}
                count={marketplaceTotal}
                hideActions
            />
        </>
    );
};

export default MarketplaceListContent;
