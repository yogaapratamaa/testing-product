import { gql } from '@apollo/client';

export const getShipmentDetail = gql`
  query ShipmentDetail($orderId: String! , $shipmentId: String!){
    shipmentDetail(orderId: $orderId, shipmentId: $shipmentId) {
      id
      clientId
      orderId
      tenantId
      storeId
      provider
      service
      items {
        sku
        name
        code
        qty
        unit
        note
        price {
          amount
          currencyCode
        }
        components {
          sku
          name
          qty
          price {
            currencyCode
            amount
          }
        }
      }
      origin {
        warehouse_id
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
      fee {
        amount
        currencyCode
      }
      stateHistories {
        state
        timestamp
        remark
      }
      awbNumber
      awbRetrievedAt
      state
      referenceId
      additionalInfo {
        doDateDone
        doNumber
        doScheduledAt
        doSentAt
        doStatus
      }
    }
  }
`;

export const getShipmentList = gql`
  query shipmentList ($input: ShipmentListInput!){
    shipmentList(input: $input) {
      items {
        id
        clientId
        orderId
        tenantId
        storeId
        provider
        service
        awbNumber
        awbRetrievedAt
        state
        referenceId
        origin {
          warehouse_id
        }
        recipient {
          name
          country
        }
      }
      page {
        next
        prev
      }
    }
  }
`;

export const getChannelByOrderId = gql`
  query getChannelByOrderId ($id: String!){
    orderDetail(id:$id) {
      channelId
    }
  }
`;
export const setShipmentRTS = gql`
  mutation setShipmentRTS($shipmentId: String!,$awbNumber:String){
    shipmentSetRTS(input: [
      { 
      shipmentId: $shipmentId,
      awbNumber: $awbNumber }
    ]) {
      successIds
      failedIds
    }
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

export default {
    getShipmentDetail,
    getShipmentList,
    getChannelByOrderId,
    setShipmentRTS,
    getChannelStoreName,
};
