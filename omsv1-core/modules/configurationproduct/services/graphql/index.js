import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationproduct/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductConfiguration = (variables) => useQuery(Schema.getProductConfiguration, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getProductConfiguration,
    saveStoreConfig,
};
