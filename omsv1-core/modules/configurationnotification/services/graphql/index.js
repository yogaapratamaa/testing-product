import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationnotification/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getNotificationConfiguration = (variables) => useQuery(Schema.getNotificationConfiguration, {
    variables, ...context, ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables, ...context,
});

export default {
    getNotificationConfiguration,
    saveStoreConfig,
};
