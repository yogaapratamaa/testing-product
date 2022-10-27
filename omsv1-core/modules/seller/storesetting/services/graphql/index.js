import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@sellermodules/storesetting/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerStore = (variables) => useQuery(Schema.getSellerStore, {
    variables, ...context, ...fetchPolicy,
});

export const saveSellerStore = (variables) => useMutation(Schema.saveSellerStore, {
    variables, ...context,
});

export const getLogistixShippingMethods = (variables) => useQuery(Schema.getLogistixShippingMethods, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getSellerStore,
    saveSellerStore,
    getLogistixShippingMethods,
};
