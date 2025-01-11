import {
  useCameraPermissions,
  CameraView,
  CameraCapturedPicture,
  CameraType,
} from "expo-camera";
import { Link, router, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import path from "path";
import * as FileSystem from "expo-file-system";

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [picture, setPicture] = useState<CameraCapturedPicture | undefined>(
    undefined
  );
  const cameraRef = useRef<CameraView>(null);

  const toggleCameraFacing = () => {
    setFacing((facing) => (facing === "back" ? "front" : "back"));
  };
  const handleTakePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync?.();
    setPicture(photo);
  };

  const saveFile = async (uri: string) => {
    const filename = path.parse(uri).base;
    await FileSystem.copyAsync({
      from: uri,
      to: `${FileSystem.documentDirectory}${filename}`,
    });
    setPicture(undefined);
    router.back();
  };
  useEffect(() => {
    console.log("Camera permission", permission);
    if (permission && !permission?.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);
  if (!permission?.granted) {
    return (
      <View>
        <Text>No camera permissions</Text>
        <Pressable onPress={requestPermission}>
          <Text>Request permission</Text>
        </Pressable>
      </View>
    );
  }

  if (picture) {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <Image
          source={{ uri: picture.uri }}
          style={{
            width: "100%",
            flex: 1,
          }}
        />
        <View style={{ padding: 20 }}>
          <SafeAreaView edges={["bottom"]}>
            <Button title="Save" onPress={() => saveFile(picture?.uri)} />
          </SafeAreaView>
        </View>
        <MaterialIcons
          name="close"
          size={30}
          color="white"
          style={styles.close}
          onPress={() => setPicture(undefined)}
        />
      </View>
    );
  }
  return (
    <View>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.footer}>
          <Pressable style={styles.recordBtn} onPress={handleTakePicture} />
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color="white"
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>

      <MaterialIcons
        name="close"
        size={30}
        color="white"
        style={styles.close}
        onPress={() => router.back()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  close: {
    position: "absolute",
    top: 60,
    right: 20,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  recordBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
});

export default CameraScreen;
