import React, { useEffect, useState } from 'react';
import Layout from '@layout';
import gqlService from '@sellermodules/catalog/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';
import BackdropLoad from '@helper_backdropload';

const Core = (props) => {
    const {
        Content,
        t,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('sellercatalog:Catalog'),
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_product_list',
    });
    const { loading: aclDeleteProductLoading, data: aclDeleteProductData } = aclService.isAccessAllowed({
        acl_code: 'product_delete',
    });
    const { loading: aclCreateProductLoading, data: aclCreateProductData } = aclService.isAccessAllowed({
        acl_code: 'product_create',
    });

    const [getProductList, { data, loading }] = gqlService.getProductList();
    const [productFetchManual] = gqlService.productFetchManual();
    const [deleteProducts] = gqlService.deleteProducts();

    const [aclProductList, setAclProductList] = useState({
        product_fetch_from_marketplace: false,
        product_create: false,
        product_export: false,
    });

    const handleFetchManual = () => {
        productFetchManual().then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.data.productFetchManual,
                variant: 'success',
            });
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        BackdropLoad(aclCheckLoading || aclCreateProductLoading || aclDeleteProductLoading);
    }, [aclCheckLoading, aclCreateProductLoading, aclDeleteProductLoading]);

    useEffect(() => {
        if (!aclCreateProductLoading) {
            setAclProductList({
                product_create: aclCreateProductData?.isAccessAllowed || false,
            });
        }
    }, [aclCreateProductLoading]);

    if (aclCheckLoading || aclCreateProductLoading || aclDeleteProductLoading) {
        return <Layout pageConfig={pageConfig} seller />;
    }
    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
        return <Layout pageConfig={pageConfig} seller />;
    }

    const contentProps = {
        getProductList,
        data,
        loading,
        handleFetchManual,
        t,
        deleteProducts,
        aclProductList,
        isAllowDeleteProduct: (aclDeleteProductData && aclDeleteProductData.isAccessAllowed) || false,
    };

    return (
        <Layout pageConfig={pageConfig} seller>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
