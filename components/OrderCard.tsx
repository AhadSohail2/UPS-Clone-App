import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootTypeParamList } from "../navigator/RootNavigator";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";

interface props {
  item: Order;
}

type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootTypeParamList, "Order">
>;

const OrderCard = ({ item }: props) => {
  const tw = useTailwind();
  const navigation = useNavigation<OrderScreenNavigationProp>();

  const pressHandler = () => {
    navigation.navigate("Order", { order: item });
  };

  return (
    <TouchableOpacity onPress={pressHandler}>
      <Card containerStyle={tw("px-5 rounded-lg")}>
        <View style={tw("flex-row justify-between items-center")}>
          <View>
            <Icon
              name="truck-delivery"
              type="material-community"
              color="#eb6a7c"
              size={50}
            />
            <Text style={{ fontSize: 12 }}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View>
            <Text style={[tw("text-gray-400"), { fontSize: 10 }]}>
              {item.carrier} - {item.trackingId}
            </Text>
            <Text style={tw("text-gray-500 text-xl")}>
              {item.trackingItems.customer.name}
            </Text>
          </View>

          <View style={tw("flex-row items-center")}>
            <Text style={[tw("text-sm"), { color: "#eb6a7c" }]}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon
              name="box"
              type="feather"
              color="#eb6a7c"
              style={tw("ml-2")}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;
