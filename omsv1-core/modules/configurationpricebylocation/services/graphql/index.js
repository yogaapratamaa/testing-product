import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationpricebylocation/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPriceLocationConfiguration = (variables) => useQuery(Schema.getPriceLocationConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getPriceLocationConfiguration,
    saveStoreConfig,
};
