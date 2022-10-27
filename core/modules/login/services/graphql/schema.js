import { gql } from '@apollo/client';

export const getCustomerToken = gql`
  mutation login(
      $username: String!,
      $password: String!,
  ) {
    internalGenerateCustomerToken(
      input: {
        username: $username, 
        password: $password
      }
    ) {
        token
      }
    }
`;

export const removeToken = gql`
mutation {
  internalDeleteCustomerToken{
    result
  }
}
`;

export const getCustomer = gql`
  {
    getCurrentUser {
      id
      fullname
      username
      role_id
      createdAt
      updatedAt
      lastLoginAt
    }
  }

`;

export const getStoreConfig = gql`
  query getStoreConfig($path: String!){
    getStoreConfig(path: $path)
  }
`;

export default {
    getCustomerToken,
    removeToken,
    getCustomer,
    getStoreConfig,
};
