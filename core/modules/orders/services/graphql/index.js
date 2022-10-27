import {
    useLazyQuery, useMutation, useQuery,
} from '@apollo/client';
import * as Schema from '@modules/orders/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getOrderDetail = (variables) => useQuery(Schema.getOrderDetail, {
    ...variables, ...context, ...fetchPolicy,
});

export const getOrderList = (variables) => useLazyQuery(Schema.getOrderList, {
    ...variables, ...context, ...fetchPolicy,
});

export const getOrderSearch = (variables) => useLazyQuery(Schema.getOrderSearch, {
    ...variables, ...context, ...fetchPolicy,
});

export const importOrderCSV = (variables) => useMutation(Schema.importOrderCSV, {
    variables, ...context,
});

export const validateAddItem = (variables) => useMutation(Schema.validateAddItem, {
    variables, ...context,
});

export const editItemOrder = (variables) => useMutation(Schema.editItemOrder, {
    variables, ...context,
});

export const getChannelStoreName = (variables) => useQuery(Schema.getChannelStoreName, {
    ...variables, ...context,
});

export const getCountries = () => useLazyQuery(Schema.getCountryList);

export const getRegions = () => useLazyQuery(Schema.getProvinceList);

export default {
    getOrderDetail,
    getOrderList,
    getOrderSearch,
    importOrderCSV,
    validateAddItem,
    editItemOrder,
    getChannelStoreName,
    getCountries,
    getRegions,
};
