import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TareasScreen = ({ navigation }) => {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  const handleAgregarTarea = () => {
    if (nuevaTarea.trim()) {
      setTareas([
        ...tareas,
        { id: Date.now().toString(), texto: nuevaTarea, completada: false },
      ]);
      setNuevaTarea("");
    }
  };

  const handleToggleTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const handleEliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.header}>Lista de Tareas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nueva tarea"
          value={nuevaTarea}
          onChangeText={setNuevaTarea}
          placeholderTextColor="#aaaaaa"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAgregarTarea}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {tareas.map((tarea) => (
          <View key={tarea.id} style={styles.tareaContainer}>
            <TouchableOpacity onPress={() => handleToggleTarea(tarea.id)}>
              <MaterialIcons
                name={
                  tarea.completada ? "check-box" : "check-box-outline-blank"
                }
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.tareaTexto,
                tarea.completada && styles.tareaTextoCompletada,
              ]}
            >
              {tarea.texto}
            </Text>
            <TouchableOpacity onPress={() => handleEliminarTarea(tarea.id)}>
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ededd3",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
  },
  input: {
    flex: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd",
    backgroundColor: "#333",
    color: "#ffffff",
  },
  addButton: {
    backgroundColor: "#800040",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  scrollView: {
    width: "100%",
    marginTop: 20,
  },
  tareaContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  tareaTexto: {
    flex: 1,
    color: "#ffffff",
    marginLeft: 10,
  },
  tareaTextoCompletada: {
    textDecorationLine: "line-through",
    color: "#777",
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

export default TareasScreen;
