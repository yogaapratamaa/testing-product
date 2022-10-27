import { gql } from '@apollo/client';

export const getOrderDetail = gql`
  query orderDetail ($id: String!){
    orderDetail(id: $id) {
      id
      tenantId
      parentOrderId
      clientId
      type
      state
      version
      createdAt
      updatedAt
      createdBy
      updatedBy
      channelId
      referenceId
      items {
        name
        qty
        sku
        components {
          sku
          name
          code
          qty
          unit
          price{
            amount
            currencyCode
          }
        }
        price {
          amount
          currencyCode
        }
        totalPrice {
          amount
          currencyCode
        }
      }
      recipient {
        name
        phone
        mobile
        email
        country
        province
        city
        district
        subDistrict
        street
        postalCode
        additionalInfo {
          address2
        }
      }
      seller {
        name
        phone
        mobile
        email
        country
        province
        city
        district
        subDistrict
        street
        postalCode
      }
      paymentState
      payments {
        id
        provider
        service
        uniqueCode
        paidAt
        paymentReference
        paymentState
      }
      shipments {
        provider
        service
        awbNumber
        awbRetrievedAt
        state
        referenceId
        fee {
          amount
          currencyCode
        }
        recipient {
          name
          phone
          mobile
          email
          country
          province
          city
          district
          subDistrict
          street
          postalCode
        }
      }
      stateHistories {
        state
        timestamp
        remark
      }
      additionalInfo {
        awbSourceChannel
        channelOrderStatus
        channelOrderNumber
        channelOrderReference
        remoteWarehouseId
      }
    }
  }
`;

export const getOrderList = gql`
  query getOrderPage ($input: OrderPageInput!){
    orderPage(input: $input) {
      page {
        next,
        prev
      },
      items {
        id,
        tenantId,
        clientId,
        storeId,
        channelId,
        orderedAt,
        updatedAt,
        buyerNote,
        state,
        additionalInfo {
          awbSourceChannel
          channelOrderStatus
          channelOrderNumber
          channelOrderReference
          remoteWarehouseId
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
          }
          components {
            sku
          },
          note
        },
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
        }
      }
    }
  }
`;

export const getOrderSearch = gql`
  query getOrderSearch ($input: OrderSearchInput!){
    orderSearch(input: $input) {
      page {
        next,
        prev
      },
      items {
        id,
        tenantId,
        clientId,
        channelId,
        orderedAt,
        updatedAt,
        buyerNote,
        state,
        additionalInfo {
          awbSourceChannel
          channelOrderStatus
          channelOrderNumber
          channelOrderReference
          remoteWarehouseId
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
          }
          components {
            sku
          },
          note
        },
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
        }
      }
    }
  }
`;
export const importOrderCSV = gql`
  mutation orderImportCSV($base64: String!){
    orderImport(input: { base64: $base64 }) {
      is_success
      error_message
    }
  }
`;
export const validateAddItem = gql`
  mutation validateEditItem ($sku: String!,$qty:Int!, $replacement_for: String!, $orderId: String!){
    validateEditItem(
      input: { sku: $sku, qty: $qty, replacement_for: $replacement_for, orderId: $orderId}
    ) {
      store_id
      images {
        id
        image
        thumb_sm
        thumb_lg
      }
      category_name
      upc
      brand_name
      category_id
      internal_code
      name
      id
      sku
      bundles {
        store_id
        category_name
        upc
        brand_name
        category_id
        internal_code
        name
        id
        sku
        quantity
      }
      quantity
    }
  }
`;

export const editItemOrder = gql`
  mutation editItemOrder(
    $orderId:String!, 
    $recipient: AddressInput,
    $items: [EditItemInput!]
  ){
    orderEdit(input: { 
      orderId: $orderId,
      recipient:$recipient,
      items: $items
    })
  }
`;

export const getChannelStoreName = gql`
  query getChannelStoreName(
    $input:ChannelStoreListFilterInput
  ){
    channelStoreListFilter(input: $input) {
      id
      tenantId
      code
      name
      stockRoutingRule
      createdAt
      updatedAt
    }
  }
`;

export const getCountryList = gql`
  query getCountryList{
    getCountryList {
      id
      code
      name
    }
  }
`;

export const getProvinceList = gql`
  query getProvince ($countryCode: String!){
    getProvinceByCountry(countryCode: $countryCode) {
      id
      code
      name
    }
  }
`;

export default {
    getOrderDetail,
    getOrderList,
    getOrderSearch,
    importOrderCSV,
    validateAddItem,
    editItemOrder,
    getChannelStoreName,
    getCountryList,
    getProvinceList,
};
