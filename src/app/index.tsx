import { Link, useFocusEffect } from "expo-router";
import { Pressable, View, FlatList, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useState } from "react";

type Media = {
  name: string;
  uri: string;
};

const HomeScreen = () => {
  const [pictures, setPictures] = useState<Media[]>([]);
  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) {
      return;
    }
    const files = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );

    const pictures = files
      ?.filter((name) => name.endsWith("jpg"))
      .map((name) => ({
        name,
        uri: `${FileSystem.documentDirectory}${name}`,
      }));

    setPictures(pictures);
  };

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={pictures}
        numColumns={3}
        contentContainerStyle={{ gap: 1 }}
        columnWrapperStyle={{ gap: 1 }}
        renderItem={({ item }) => (
          <Link href={`/${item.name}`} asChild>
            <Pressable style={{ flex: 1, maxWidth: "33.33%" }}>
              <Image
                key={item.name}
                source={{ uri: item.uri }}
                style={{ aspectRatio: 3 / 4, borderRadius: 10 }}
              />
            </Pressable>
          </Link>
        )}
      />

      <Link
        asChild
        href="/camera"
        style={{
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "royalblue",
            padding: 20,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#fff",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <MaterialIcons name="photo-camera" size={24} color="white" />
        </Pressable>
      </Link>
    </View>
  );
};

export default HomeScreen;
