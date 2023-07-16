import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useTailwind } from "tailwind-rn";
import { Icon } from "@rneui/themed";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootTypeParamList } from "../navigator/RootNavigator";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useCustomerOrders from "../store/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootTypeParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootTypeParamList, "MyModal">;

const ModalScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const tw = useTailwind();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();
  const { loading, error, order } = useCustomerOrders(userId);

  const closeHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={tw("mt-10")}>
      <TouchableOpacity
        onPress={closeHandler}
        style={tw("absolute top-5 right-5 z-10")}
      >
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>
      <View>
        <View style={[tw("py-5 border-b"), { borderColor: "#5dc1cc" }]}>
          <Text
            style={[tw("text-center text-xl font-bold"), { color: "#5dc1cc" }]}
          >
            {name}
          </Text>
          <Text style={[tw("text-center italic text-sm")]}>Deliveries</Text>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={order}
        keyExtractor={(o) => o.trackingId}
        renderItem={({ item: orders }) => {
          return <DeliveryCard order={orders} />;
        }}
      />
    </View>
  );
};

export default ModalScreen;
