import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@common_tenantlistinput/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCurrentUser = (options) => useQuery(Schema.getCurrentUser, {
    ...options, ...context, fetchPolicy: 'no-cache',
});
export const tenantListFilter = (options) => useLazyQuery(Schema.tenantListFilter, {
    ...options, ...context, ...fetchPolicy,
});

export default {
    getCurrentUser,
    tenantListFilter,
};
