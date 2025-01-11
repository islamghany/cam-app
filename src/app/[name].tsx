import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";

export default function ImageScreen() {
  const { name } = useLocalSearchParams();
  const fullURI = `${FileSystem.documentDirectory || ""}${name || ""}`;

  const onDelte = async () => {
    console.log("Deleting", fullURI);
    await FileSystem.deleteAsync(fullURI);
    router.back();
  };
  return (
    <View>
      <Stack.Screen
        options={{
          title: `Media`,
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                name="delete"
                size={24}
                color="black"
                onPress={onDelte}
              />
            </View>
          ),
        }}
      />
      <Image
        source={{ uri: fullURI }}
        style={{ height: "100%", width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
