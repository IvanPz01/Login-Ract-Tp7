import React, { useState, useEffect } from "react";
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

const validarLogin = (usuario, contraseña, usuarios) => {
  if (!usuarios) return false;
  const usuarioValido = usuarios.find(
    (u) => u.usuario === usuario && u.password === contraseña
  );
  return !!usuarioValido;
};

const LoginScreen = ({ navigation, route }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    if (route.params?.usuarios) {
      setUsuarios(route.params.usuarios);
    }
  }, [route.params?.usuarios]);

  const handleLogin = () => {
    if (validarLogin(usuario, password, usuarios)) {
      navigation.navigate("Home", { usuario });
    } else {
      setMensajeError("Usuario o contraseña incorrectos");
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
      <Text style={styles.header}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
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

export default LoginScreen;
