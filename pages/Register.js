import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RegisterScreen = ({ navigation, route }) => {
  const [usuarios, setUsuarios] = useState(route.params?.usuarios || []);
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const handleRegister = () => {
    // Validar nombre de usuario
    if (nuevoUsuario.length < 5 || nuevoUsuario.length > 10) {
      setMensajeError("El usuario debe tener entre 5 y 10 caracteres");
      return;
    }

    // Validar contraseña
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    if (!strongPasswordRegex.test(password)) {
      setMensajeError(
        "La contraseña debe tener al menos 5 caracteres, una letra mayúscula, una letra minúscula, y un símbolo"
      );
      return;
    }

    if (usuarios.some((u) => u.usuario === nuevoUsuario)) {
      setMensajeError("El usuario ya existe");
    } else {
      const usuarioNuevo = { usuario: nuevoUsuario, password };
      const usuariosActualizados = [...usuarios, usuarioNuevo];
      setUsuarios(usuariosActualizados);
      navigation.navigate("Login", { usuarios: usuariosActualizados });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.header}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={nuevoUsuario}
        onChangeText={setNuevoUsuario}
        placeholderTextColor="#aaaaaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaaaaa"
      />
      {mensajeError ? (
        <Text style={styles.errorText}>{mensajeError}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ededd3",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd",
    backgroundColor: "#333",
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#800040",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
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
  errorText: {
    color: "red",
    marginVertical: 10,
  },
});

export default RegisterScreen;
