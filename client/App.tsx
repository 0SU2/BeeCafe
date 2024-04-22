import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginUser } from './modules/firebase/fireBaseConfig';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    loginUser(email, password); // Llama a la función de inicio de sesión de Firebase
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFC600', '#FFFFFF']} // Amarillo en la parte superior a blanco hacia abajo
        style={styles.background}
        start={{ x: 0, y: 0 }} // Inicio del gradiente en la parte superior
        end={{ x: 0, y: 1 }} // Final del gradiente en la parte inferior
      />
      <Text style={styles.titulo}>BeeCafe</Text>
      <Text style={styles.subTitle}>Iniciar sesión en su cuenta</Text>
      <TextInput 
        style={styles.textInput}
        placeholder="Correo Electronico"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
        secureTextEntry // Oculta el texto de la contrasenia
      />
      <TouchableOpacity onPress={handleLogin}>
        <LinearGradient
        // Button Linear Gradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.button}
        >
          <Text style={styles.text}>Iniciar Sesión</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffc600', // Puedes eliminar o ajustar este color de fondo si ya no es necesario
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0, // Modificado para extender el gradiente a todo el contenedor
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
  titulo: {
    fontSize: 90,
    color: '#1b3b6a',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
    marginBottom: 20,
  },
  textInput: {
    padding: 10,
    paddingStart: 20,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderColor: '#000', // Color del marco: negro
    borderWidth: 1, // Ancho del marco
  },
});
