import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@sellermodules/order/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSellerOrders = (variables) => useLazyQuery(Schema.getSellerOrders, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getSellerOrder = (variables) => useQuery(Schema.getSellerOrder, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getSellerOrders,
    getSellerOrder,
};
