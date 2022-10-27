import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/theme/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const customerAccessControlList = (variables) => useQuery(Schema.customerAccessControlList, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreConfig = (variables) => useQuery(Schema.getStoreConfig, {
    variables, ...context, ...fetchPolicy,
});

export const isAccessAllowed = (variables) => useQuery(Schema.isAccessAllowed, {
    variables, ...context, ...fetchPolicy,
});

export const isAccessAllowedLazy = (options) => useLazyQuery(Schema.isAccessAllowed, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export const getStoreLogo = (variables) => useQuery(Schema.getStoreLogo, {
    variables, ...context, ...fetchPolicy,
});

export default {
    customerAccessControlList,
    getStoreConfig,
    isAccessAllowed,
    isAccessAllowedLazy,
    getStoreLogo,
};
