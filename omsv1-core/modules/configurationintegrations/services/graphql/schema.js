import { gql } from '@apollo/client';

export const getIntegrationList = gql`
    query getIntegrationList($pageSize: Int!, $currentPage: Int!, $filter: IntegrationFilterInput, $sort: IntegrationSortInput) {
        getIntegrationList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                integration_id
                name
                status
                status_label
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const deleteIntegration = gql`
    mutation deleteIntegration($id: [Int!]!) {
        deleteIntegration(id: $id)
    }
`;

export const getIntegrationById = gql`
    query getIntegrationById(
        $id: Int!,
    ){
        getIntegrationById(
            id: $id
        ){
            integration_id
            name
            email
            status
            callback_url
            identity_link_url
            consumer_key
            consumer_secret
            token
            token_secret
        }
    }
`;

export const createIntegration = gql`
    mutation createIntegration(
        $name: String!,
        $email: String,
        $callback_url: String,
        $identity_link_url: String,
        $activate: Boolean,
        $password: String!
    ){
        createIntegration(
            input: {
                name: $name,
                email: $email,
                callback_url: $callback_url,
                identity_link_url: $identity_link_url,
                activate: $activate,
                password: $password
            }
        ){
            integration_id
            name
            email
            status
            callback_url
            identity_link_url
            consumer_key
            consumer_secret
            token
            token_secret
        }
    }
`;

export const updateIntegration = gql`
    mutation updateIntegration(
        $integration_id: Int!,
        $name: String!,
        $email: String,
        $callback_url: String,
        $identity_link_url: String,
        $password: String!
    ){
        updateIntegration(
            input: {
                integration_id: $integration_id,
                name: $name,
                email: $email,
                callback_url: $callback_url,
                identity_link_url: $identity_link_url,
                password: $password
            }
        ){
            integration_id
            name
            email
            status
            callback_url
            identity_link_url
            consumer_key
            consumer_secret
            token
            token_secret
        }
    }
`;

export const generateIntegration = gql`
    mutation generateIntegration(
        $integration_id: Int,
        $clear_exist_token: Boolean
    ){
        generateIntegration(
            integration_id: $integration_id,
            clear_exist_token: $clear_exist_token
        ){
            consumer_key
            consumer_secret
            token
            token_secret
        }
    }
`;

export default {
    getIntegrationList,
    deleteIntegration,
    getIntegrationById,
    createIntegration,
    updateIntegration,
    generateIntegration,
};
