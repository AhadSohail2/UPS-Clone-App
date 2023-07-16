import React, { useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";

import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Image } from "@rneui/themed";
import { useTailwind } from "tailwind-rn";
import { Input } from "@rneui/base";
import { useQuery } from "@apollo/client";

import { TabStackParamList } from "../navigator/TabNavigator";
import { RootTypeParamList } from "../navigator/RootNavigator";
import { GET_Customers } from "../graphql/queries";
import CustomerCard from "../components/CustomerCard";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootTypeParamList>
>;

const CustomersScreen = () => {
  const Navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>("");
  const { data, loading, error } = useQuery(GET_Customers);
  const tw = useTailwind();

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#5dc1cc" }}>
      <Image
        source={{ uri: "https://links.papareact.com/3jc" }}
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        placeholder="Search By Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={tw("bg-white pt-5 pb-0 px-10")}
      />
      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(input)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => {
          return (
            <CustomerCard key={ID} email={email} name={name} userId={ID} />
          );
        })}
    </ScrollView>
  );
};

export default CustomersScreen;
