import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootTypeParamList } from "../navigator/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootTypeParamList, "Order">
>;

type OrderScreenRouteProp = RouteProp<RootTypeParamList, "Order">;

const OrderScreen = () => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTitleStyle: { color: "black" },
      headerBackTitle: "Deliveries",
      headerTintColor: "#eb6a7c",
    });
  }, [order]);

  return (
    <View style={tw("-mt-2")}>
      <DeliveryCard key={order.trackingId} order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;
