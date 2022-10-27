import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/catalog/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductList = (variables) => useLazyQuery(Schema.getProductList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const productFetchManual = (variables) => useMutation(Schema.productFetchManual, {
    variables,
    ...context,
});

export const deleteProducts = (variables) => useMutation(Schema.deleteProducts, {
    variables,
    ...context,
});

export default {
    getProductList,
    productFetchManual,
    deleteProducts,
};
