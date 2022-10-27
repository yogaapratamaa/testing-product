import { gql } from '@apollo/client';

export const getVendorConfiguration = gql`
    query {
        getVendorConfiguration {
            label
            fields {
                id
                type
                label
                options {
                    value
                    label
                }
                form_fields {
                    id
                    label
                }
                can_restore
                value
                is_default
                comment
            }
        }
    }
`;

export const saveStoreConfig = gql`
    mutation saveStoreConfig($input: [SaveStoreConfigInput]!) {
        saveStoreConfig(input: $input)
    }
`;

export default {
    getVendorConfiguration,
    saveStoreConfig,
};
