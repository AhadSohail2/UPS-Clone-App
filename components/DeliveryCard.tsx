import { View, Text } from "react-native";
import React from "react";
import { Card, Divider, Icon } from "@rneui/themed";
import { useTailwind } from "tailwind-rn";
import MapView, { Marker } from "react-native-maps";

type props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: props) => {
  const tw = useTailwind();

  return (
    <Card
      containerStyle={[
        tw(`${fullWidth ? "rounded-none m-0" : "rounded-lg"} my-2`),
        {
          padding: 0,
          paddingTop: 18,
          shadowColor: "Black",
          shadowOffset: { height: 2, width: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 1,
          backgroundColor: fullWidth ? "#eb6a7c" : "#5dc1cc",
        },
      ]}
    >
      <View style={fullWidth && { height: "100%" }}>
        <Icon name="box" type="entypo" color="white" size={50} />
        <View>
          <Text
            style={tw("text-xs text-center uppercase text-white font-bold")}
          >
            {order.carrier} - {order.trackingId}
          </Text>
          <Text style={tw("text-white text-center text-lg font-bold")}>
            Expected Delivery {new Date(order.createdAt).toLocaleDateString()}
          </Text>
          <Divider color="white" />
        </View>
        <View style={tw("mx-auto")}>
          <Text style={tw("text-base text-center text-white font-bold mt-5")}>
            Address
          </Text>
          <Text style={tw("text-sm text-center text-white")}>
            {order.Address}, {order.City}
          </Text>

          <Text style={tw("text-sm text-center italic text-white")}>
            Shipping Cost ${order.shippingCost}
          </Text>
        </View>
        <Divider color="white" />
        <View style={tw("p-5")}>
          {order.trackingItems.items.map((item) => {
            return (
              <View
                key={item.item_id}
                style={tw("flex-row justify-between items-center")}
              >
                <Text style={tw("text-sm italic text-white")}>{item.name}</Text>
                <Text style={tw("text-xl text-white")}>x{item.quantity}</Text>
              </View>
            );
          })}
        </View>
        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            longitudeDelta: 0.005,
            latitudeDelta: 0.005,
          }}
          style={[tw("w-full"), { flexGrow: 1 }, !fullWidth && { height: 200 }]}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{
                latitude: order.Lat,
                longitude: order.Lng,
              }}
              title="Delivery Location"
              description={order.Address}
              identifier="destination"
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;
