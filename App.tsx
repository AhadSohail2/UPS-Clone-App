import React from "react";

import utilities from "./tailwind.json";
import { TailwindProvider } from "tailwind-rn";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { LocalStepZenURL } from "@env";

const client = new ApolloClient({
  uri: LocalStepZenURL,
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    // @ts-ignore - Tailwind Provider A Missing Defination
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
