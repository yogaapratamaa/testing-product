import Layout from '@layout';
import gqlService from '@sellermodules/order/services/graphql';
import BackdropLoad from '@helper_backdropload';
import gqlStore from '@sellermodules/storesetting/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;

    const router = useRouter();
    const pageConfig = {
        title: t('sellerorder:Order_List'),
        customBreadcrumb: [
            { url: '', label: 'Order' },
            { url: router.asPath, label: t('sellerorder:Order_List') },
        ],
    };

    const [getSellerOrders, { data, loading }] = gqlService.getSellerOrders();
    const { loading: loadShipment, data: dataShipment } = gqlStore.getLogistixShippingMethods();

    React.useEffect(() => {
        BackdropLoad(loadShipment);
    }, [loadShipment]);

    if (loadShipment) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        getSellerOrders,
        data,
        loading,
        t,
        dataProvider: dataShipment.getLogistixShippingMethods,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
