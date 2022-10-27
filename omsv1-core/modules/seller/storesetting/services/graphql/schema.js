import { gql } from '@apollo/client';

export const getSellerStore = gql`

{
    getSellerStore {
      city
      code
      country_id
      description
      id
      is_active
      latitude
      logo
      longitude
      name
      postcode
      region
      shipping_methods
      street
      telephone
    }
  }  
`;

export const saveSellerStore = gql`
    mutation saveSellerStore($input: SellerStoreInput!) {
        saveSellerStore(input: $input) {
          id
        }
    }  
`;

export const getLogistixShippingMethods = gql`
{
  getLogistixShippingMethods {
    credential_flag
    entity_id
    is_active
    provider
    service
    shipping_method_logo_url
  }
}
`;

export default {
    getSellerStore,
    saveSellerStore,
    getLogistixShippingMethods,
};
