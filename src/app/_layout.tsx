import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" animated={true} />
      <Stack
        screenOptions={{
          headerTintColor: "black",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
