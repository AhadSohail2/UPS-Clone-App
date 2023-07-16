import React, { useLayoutEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, Image } from "@rneui/themed";

import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootTypeParamList } from "../navigator/RootNavigator";
import { useTailwind } from "tailwind-rn";
import useOrders from "../store/useOrders";
import OrderCard from "../components/OrderCard";

type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootTypeParamList, "Order">
>;

const OrdersScreen = () => {
  const tw = useTailwind();
  const { loading, error, orders } = useOrders();
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const [asscending, setAsscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarActiveTintColor: "#eb6a7c",
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#eb6a7c" }}>
      <Image
        source={{ uri: "https://links.papareact.com/m51" }}
        containerStyle={tw("w-full h-64")}
      />
      <View>
        <Button
          onPress={() => setAsscending((prev) => !prev)}
          color="pink"
          titleStyle={{ color: "gray", fontWeight: "400" }}
          style={tw("py-2 px-5")}
        >
          {asscending ? "Descending" : "Ascending"}
        </Button>

        {orders
          ?.sort((a, b) => {
            if (asscending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => {
            return <OrderCard key={order.trackingId} item={order} />;
          })}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;
