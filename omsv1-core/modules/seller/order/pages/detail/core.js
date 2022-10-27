/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@sellermodules/order/services/graphql';
import ErrorRedirect from '@common_errorredirect';
import BackdropLoad from '@helper_backdropload';

const ContentWrapper = (props) => {
    const {
        data, Content,
    } = props;

    const transformArray = (arr = []) => {
        const res = arr.map((item) => {
            if (item.parent_item_id) {
                return { ...item, isChildOld: true };
            }
            return { ...item, isChild: false, bundle_children: [] };
        });
        arr.filter((item) => item.parent_item_id).forEach((item) => {
            const pIdx = res.findIndex((p) => p.id === item.parent_item_id);
            // eslint-disable-next-line no-prototype-builtins
            res[pIdx] = {
                ...res[pIdx],
                bundle_children: [...res[pIdx].bundle_children, { ...item }],
            };
        });
        return res;
    };

    const contentProps = {
        ...props,
        orderItem: transformArray(data.items),
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const { t } = props;
    const router = useRouter();
    const pageConfig = {
        title: `${t('order:Detail_Order_')}${router.query?.id}`,
    };

    const { loading, data, error } = gqlService.getSellerOrder({
        id: router && router.query && Number(router.query.id),
    });

    React.useEffect(() => {
        BackdropLoad(loading);
    }, [loading]);

    if (loading) {
        return <Layout pageConfig={pageConfig} seller />;
    }

    if (!data) {
        const errMsg = error?.message ?? t('order:Data_not_found');
        const redirect = '/seller/order';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    return (
        <Layout pageConfig={pageConfig} seller>
            <ContentWrapper
                data={data?.getSellerOrder || {}}
                {...props}
            />
        </Layout>
    );
};

export default Core;
