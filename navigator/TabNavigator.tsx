// import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomersScreen from "../screens/CustomersScreen";
import OrdersScreen from "../screens/OrdersScreen";
import { Icon } from "@rneui/base";

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#5dc1cc",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name == "Customers") {
            return (
              <Icon
                name="users"
                type="entypo"
                color={focused ? "#5dc1cc" : "gray"}
              />
            );
          } else {
            return (
              <Icon
                name="box"
                type="entypo"
                color={focused ? "#eb6a7c" : "gray"}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Customers" component={CustomersScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
