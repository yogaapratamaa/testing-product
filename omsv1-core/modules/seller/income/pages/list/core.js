import React from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/income/services/graphql';
import aclService from '@modules/theme/services/graphql';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const pageConfig = {
        title: t('sellerincome:Income'),
    };

    const [getSellerBalanceHistory, { data, loading }] = gqlService.getSellerBalanceHistory();
    const [getSellerWithdrawalHistory, { data: dataWithdraw, loading: loadingWithdraw }] = gqlService.getSellerWithdrawalHistory();
    const { data: dataBalance, loading: loadingBalance } = gqlService.getVendorIrisBalance();
    const { loading: loadMinBalance, data: dataMinBalance } = aclService.getStoreConfig({
        path: 'swiftoms_vendorportal/iris/minimum_payout',
    });

    React.useEffect(() => {
        BackdropLoad(loadingBalance || loadMinBalance);
    }, [loadingBalance, loadMinBalance]);

    if (loadingBalance) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        getSellerBalanceHistory,
        getSellerWithdrawalHistory,
        data,
        dataWithdraw,
        loading,
        loadingWithdraw,
        t,
        balance: dataBalance.getVendorIrisBalance,
        minBalance: dataMinBalance.getStoreConfig,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
