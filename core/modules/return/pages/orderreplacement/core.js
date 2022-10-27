import Layout from '@layout';
import { getReturDetailWithReference, catalogProductAllBySKUs } from '@modules/return/services/graphql';
import { useRouter } from 'next/router';
import ErrorRedirect from '@common_errorredirect';
import React from 'react';

const ContentWrapper = ({ Content, data, id }) => {
    const { getReturDetail: getData, subsidiaryLookup } = data;
    return (<Content data={getData} id={id} subsidiaryLookup={subsidiaryLookup} />);
};

const Core = ({ Content }) => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [getData, setGetData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [getSearchCatalogProduct, { data: dataProduct, error: errorProduct }] = catalogProductAllBySKUs();

    const id = router && router.query && router.query.id;
    const variables = { id };

    const { data, error: errorDetail } = getReturDetailWithReference({ variables });

    const customBreadcrumb = [
        { url: '/return', label: 'Return' },
        { url: '/return/order_replacement', label: 'Set Replacement' },
    ];

    const pageConfig = {
        title: `Set Order Replacement ${router.query?.id}`,
        customBreadcrumb,
    };

    React.useEffect(() => {
        if (data) {
            setGetData(data);
            const { getReturDetail } = data;
            const sku = getReturDetail.items.reduce((res, val) => {
                res.push(val.sku);
                return res;
            }, []);
            getSearchCatalogProduct({ variables: { sku } });
        }
    }, [data]);

    React.useEffect(() => {
        if (dataProduct) {
            const { catalogProductAllBySKUs: productList } = dataProduct;
            const copyGetData = { ...getData };
            const { getReturDetail } = copyGetData;

            let productNotFound = false;
            getReturDetail.items.forEach((element, index) => {
                const getProduct = productList.find((el) => el.sku === element.sku);
                if (getProduct) {
                    getReturDetail.items[index].name = getProduct.name;
                } else {
                    productNotFound = true;
                }
            });

            if (productNotFound) {
                setLoading(false);
                setError({ message: 'retur couldn\'t be found' });
            } else {
                setLoading(false);
                setGetData((prev) => ({ ...prev, getReturDetail }));
            }
        }
    }, [dataProduct]);

    React.useEffect(() => {
        if (errorProduct) setError(errorProduct);
        if (errorDetail) setError(errorDetail);
    }, [errorProduct, errorDetail]);

    if (error || !id) {
        const errMsg = error?.message === 'retur couldn\'t be found' ? `Retur ${variables.id} couldn't be found` : error?.message;
        return <ErrorRedirect errMsg={errMsg} redirect="/return" pageConfig={pageConfig} />;
    }

    return (
        <Layout pageConfig={pageConfig}>
            {
                loading ? (<p>Loading retur data...</p>) : (
                    <ContentWrapper
                        data={getData}
                        Content={Content}
                        id={id}
                    />
                )
            }

        </Layout>
    );
};

export default Core;
