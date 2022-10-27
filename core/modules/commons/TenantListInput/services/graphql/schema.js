import { gql } from '@apollo/client';

export const getCurrentUser = gql`
  {
    getCurrentUser {
      appMetadataTenantIDs
    }
  }
`;
export const tenantListFilter = gql`
query tenantListFilter ($input: TenantListFilterInput) {
  tenantListFilter(input: $input) {
    code
    name
  }
}`;
export default {
    getCurrentUser,
};
