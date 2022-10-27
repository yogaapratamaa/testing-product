// schema return
import { gql } from '@apollo/client';

export const getOrderDetail = gql`
query getOrderPage ($id: String!) {
  orderDetail(id: $id) {
    id,
      tenantId,
      clientId,
      channelId,
      additionalInfo {
        channelOrderReference,
        channelOrderNumber,
        channelOrderStatus,
        awbSourceChannel
      }
      items {
        sku,
        name,
        code,
        qty,
        price {
          amount,
          currencyCode
        },
        totalPrice {
          amount,
          currencyCode
        },
        components {
          sku,
          price {
            currencyCode
            amount
          }
        },
        note
      },
      shipments {
        id,
        clientId,
        orderId,
        tenantId,
        storeId,
        provider,
        service,
        items {
          sku,
          price
        {
          currencyCode,
          amount
        }
        },
        origin {
          warehouse_id
          address {
            name,
            email,
            phone,
            mobile,
            country,
            province,
            city,
            district,
            subDistrict,
            street,
            postalCode,
            additionalInfo {
              address2
            }
          }
        },
        recipient {
          name
        },
        fee {
          amount,
          currencyCode
        },
        awbNumber,
        awbRetrievedAt,
        state,
        referenceId
      }
      recipient {
        name,
        email,
        phone,
        mobile,
        country,
        province,
        city,
        district,
        subDistrict,
        street,
        postalCode,
        additionalInfo {
          address2
        }
      },
  }
}`;

export const getOrderList = gql`
  query orderReadyToReturn($page: String!, $limit: Int!) {
    orderReadyToReturn(page: $page, limit: $limit) {
      items {
        id,
        tenantId,
        clientId,
        channelId,
        additionalInfo {
          channelOrderReference,
          channelOrderNumber,
          channelOrderStatus,
          awbSourceChannel,
        }
        buyerNote
        channelId
        clientId
        createdAt
        createdBy
        id
        items{
          code
          name
          note
          qty
          sku
          unit
        }
        recipient{
          name
        }
      }
    }
  }
`;

export const getSubsidiaryList = gql`
  query subsidiaryLookup {
    subsidiaryLookup {
      id,
      code,
      name,
      createdAt,
      updatedAt
    }
  }
`;

export const getReturDetail = gql`
query getReturDetail ($id: String!) {
  getReturDetail(id: $id) {
    id,
    warehouseLocationCode,
    subsidiary,
    items{
      sku,
      quantity,
      reason
    }
  }
}`;

export const searchCatalogProduct = gql`query searchCatalogProduct($page: Int!, $limit: Int!) {
  searchCatalogProduct(page: $page, limit: $limit) {
    items{
      id,
      sku,
      name,
      unitPerPrice
    },
    total,
    nextPage,
    prevPage
  }
}`;

export const getReturDetailWithReference = gql`
query getReturDetailWithReference ($id: String!) {
  getReturDetail(id: $id) {
    id,
    warehouseLocationCode,
    subsidiary,
    items{
      sku,
      quantity,
      reason
    }
  }
  subsidiaryLookup {
    id,
   code,
   name
 }
}`;

export const catalogProductAllBySKUs = gql`
query catalogProductAllBySKUs ($sku: [String!]) {
  catalogProductAllBySKUs(sku: $sku) {
    name
  }
}`;

export default {
    getOrderDetail,
    getOrderList,
    getSubsidiaryList,
    getReturDetail,
    getReturDetailWithReference,
};
