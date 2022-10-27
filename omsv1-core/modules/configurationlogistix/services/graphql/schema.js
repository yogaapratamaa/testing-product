import { gql } from '@apollo/client';

export const getLogistixConfiguration = gql`
    query {
        getLogistixConfiguration {
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
                upload_dir
                value
                is_default
                comment
                depends {
                    field {
                        id
                        value
                    }
                }
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
    getLogistixConfiguration,
    saveStoreConfig,
};
