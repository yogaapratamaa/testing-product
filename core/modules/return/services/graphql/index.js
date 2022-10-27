import {
    useQuery,
    useLazyQuery,
} from '@apollo/client';
import * as Schema from '@modules/return/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getOrderDetail = (variables) => useQuery(Schema.getOrderDetail, {
    ...variables, ...fetchPolicy, ...context,
});

export const getOrderList = (variables) => useQuery(Schema.getOrderList, {
    ...variables, ...fetchPolicy, errorPolicy: 'all',
});

export const getSubsidiaryList = () => useQuery(Schema.getSubsidiaryList, {
    ...fetchPolicy,
});

export const getReturDetail = (variables) => useQuery(Schema.getReturDetail, {
    ...variables, ...context, ...fetchPolicy,
});

export const searchCatalogProduct = (variables) => useLazyQuery(Schema.searchCatalogProduct, {
    ...variables, ...context, ...fetchPolicy,
});
export const getReturDetailWithReference = (variables) => useQuery(Schema.getReturDetailWithReference, {
    ...variables, ...context, ...fetchPolicy,
});

export const catalogProductAllBySKUs = (variables) => useLazyQuery(Schema.catalogProductAllBySKUs, {
    ...variables, ...context, ...fetchPolicy,
});
export default {
    getOrderDetail,
    getOrderList,
    getSubsidiaryList,
    getReturDetail,
    getReturDetailWithReference,
    searchCatalogProduct,
};
