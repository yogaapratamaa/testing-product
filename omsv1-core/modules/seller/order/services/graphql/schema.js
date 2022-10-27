import { gql } from '@apollo/client';

export const getSellerOrders = gql`
  query getSellerOrders(
      $search: String
      $filter: SellerFilterInput
      $sort: SellerSortInput
      $pageSize: Int
      $currentPage: Int
    ) {
      getSellerOrders(
        search: $search
        filter: $filter
        sort: $sort
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        items {
          channel_payment_method
          customer {
            email
            name
          }
          entity_id
          expedition {
            provider
            service
          }
          grand_total
          item_preview {
            items {
              discount_amount
              image
              name
              price
              qty
              remark
              sku
            }
            qty_more
          }
          items {
            discount_amount
            image
            name
            price
            qty
            remark
            sku
          }
          order_date
          order_number
          remark
          shipping_address {
            city
            country_name
            postcode
            region
            street
            telephone
          }
          shipping_amount
          status {
            code
            label
          }
          total_item_count
          tracks {
            carrier_code
            created_at
            description
            status {
              code
              label
            }
            title
            track_number
          }
        }
        page_info {
          current_page
          page_size
          total_pages
        }
        total_count
      }
    }
`;

export const getSellerOrder = gql`
  query getSellerOrder($id: Int!) {
    getSellerOrder(id: $id) {
      channel_payment_method
      customer {
        email
        name
      }
      entity_id
      expedition {
        provider
        service
      }
      extra_fee_amount
      grand_total
      history {
        comment
        created_at
        entity_id
        status {
          code
          label
        }
      }
      item_preview {
        items {
          discount_amount
          image
          name
          price
          qty
          remark
          sku
          subtotal
        }
        qty_more
      }
      items {
        discount_amount
        image
        name
        price
        qty
        remark
        sku
        subtotal
      }
      order_date
      order_number
      remark
      shipping_address {
        city
        country_name
        postcode
        region
        street
        telephone
      }
      shipping_amount
      status {
        code
        label
      }
      subtotal
      total_item_count
      tracks {
        carrier_code
        created_at
        description
        status {
          code
          label
        }
        title
        track_number
      }
    }
  }
`;

export default {
    getSellerOrders,
    getSellerOrder,
};
