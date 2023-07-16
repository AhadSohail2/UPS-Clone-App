import { gql, useQuery } from '@apollo/client';

export const GET_Customers = gql`
  query getCustomers   {
    getCustomers {
      value {
        email
        name
      }
      name
    }
  }
`;

export const GET_Orders = gql`
  query getOrders   {
    getOrders {
      name
      value {
        Address
        City
        Lat
        Lng
        carrier
        createdAt
        shippingCost
        trackingId
        trackingItems {
          customer {
            email
            name
          }
          customer_id
          items {
            item_id
            name
            price
            quantity
          }
        }
      }
    }
  }
`;
