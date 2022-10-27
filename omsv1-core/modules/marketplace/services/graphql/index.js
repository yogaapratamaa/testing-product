import { useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/marketplace/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getMarketplaceList = (variables) => useLazyQuery(Schema.getMarketplaceList, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getMarketplaceList,
};
