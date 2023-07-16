import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import useCustomerOrders from "../store/useCustomerOrders";
import { useTailwind } from "tailwind-rn";
import { CustomerScreenNavigationProp } from "../screens/CustomersScreen";
import { useNavigation } from "@react-navigation/native";
import { Card, Icon } from "@rneui/themed";

interface props {
  email: string;
  name: string;
  userId: string;
}

const CustomerCard = ({ email, name, userId }: props) => {
  const { loading, error, order } = useCustomerOrders(userId);
  const tw = useTailwind();
  const navigation = useNavigation<CustomerScreenNavigationProp>();

  const touchHandler = () => {
    navigation.navigate("MyModal", { name, userId });
  };

  return (
    <TouchableOpacity onPress={touchHandler}>
      <Card containerStyle={tw("p-5 rounded-lg")}>
        <View>
          <View style={tw("flex-row justify-between")}>
            <View>
              <Text style={tw("text-2xl font-bold")}>{name}</Text>
              <Text style={[tw("text-sm"), { color: "#5dc1cc" }]}>
                ID:{userId}
              </Text>
            </View>
          </View>
          <View style={tw("flex-row items-center justify-end")}>
            <Text style={{ color: "#5dc1cc" }}>
              {loading ? "Loading..." : `${order?.length} x`}
            </Text>
            <Icon
              name="box"
              type="entypo"
              color="#5dc1cc"
              size={50}
              containerStyle={tw("mb-5 ml-auto")}
            />
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;
