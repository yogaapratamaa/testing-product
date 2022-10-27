import Layout from '@layout';
import gqlService from '@modules/orders/services/graphql';
// import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';
import ErrorRedirect from '@common_errorredirect';

const Core = (props) => {
    const { Content, t } = props;
    const router = useRouter();
    const variables = {
        id: router && router.query && router.query.id,
    };
    const { loading, data, error } = gqlService.getOrderDetail({ variables });

    const customBreadcrumb = router?.query?.tab_status ? [
        { url: `/order/${router.query.tab_status}`, label: 'Orders' },
        { url: router.asPath, label: `${t('order:Detail_Order_')}${router.query?.id}` },
    ] : [
        { url: '/orders', label: 'Orders' },
        { url: '/orders/view', label: 'Order Detail' },
    ];

    const pageConfig = {
        title: `View Order ${router.query?.id}`,
        customBreadcrumb,
    };

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig} />;
    }

    if (!data) {
        const errMsg = error?.message === 'Order couldn\'t be found' ? `Order ${variables.id} couldn't be found` : error?.message;
        return <ErrorRedirect errMsg={errMsg} redirect="/orders" pageConfig={pageConfig} />;
    }

    const contentProps = {
        data,
        ...props,
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};
export default Core;
