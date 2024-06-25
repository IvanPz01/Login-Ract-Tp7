import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { usuario } = route.params;

  const handleTasksScreen = () => {
    navigation.navigate("Tareas", { usuario });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>¡Bienvenido! {usuario}</Text>
      <TouchableOpacity style={styles.button} onPress={handleTasksScreen}>
        <Text style={styles.buttonText}>Ir a Tareas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Configuraciones")}
      >
        <Text style={styles.buttonText}>Configuraciones</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ededd3",
    backgroundColor: "#372919",
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "50%",
    backgroundColor: "#4f0c00",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#800040",
    borderRadius: 10,
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
