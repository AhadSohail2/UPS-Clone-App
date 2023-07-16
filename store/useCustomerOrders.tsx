import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_Orders } from "../graphql/queries";

const useCustomerOrders = (userId: string) => {
  const { loading, error, data } = useQuery(GET_Orders);
  const [order, setOrder] = useState<Order[]>();

  useEffect(() => {
    if (!data) return;
    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => {
      return {
        carrier: value.carrier,
        Address: value.Address,
        City: value.City,
        Lat: value.Lat,
        Lng: value.Lng,
        createdAt: value.createdAt,
        shippingCost: value.shippingCost,
        trackingId: value.trackingId,
        trackingItems: value.trackingItems,
      };
    });
    const customerOrders = orders.filter(
      (order) => order.trackingItems.customer_id === userId
    );
    setOrder(customerOrders);
  }, [data, userId]);
  return { order, loading, error };
};

export default useCustomerOrders;
