import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationinvoice/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getInvoiceConfiguration = (variables) => useQuery(Schema.getInvoiceConfiguration, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveStoreConfig = (variables) => useMutation(Schema.saveStoreConfig, {
    variables,
    ...context,
});

export default {
    getInvoiceConfiguration,
    saveStoreConfig,
};
