import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { sendPasswordReset } from '../../modules/firebase/fireBaseConfig';

export default function RecoverPassword() {
  const [email, setEmail] = useState<string>('');

  const sendPasswordRest = () => {
    sendPasswordReset(email.trim());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.newContainer}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={['#FFC600', '#FFFFFF']} // Amarillo en la parte superior a blanco hacia abajo
        style={styles.background}
        start={{ x: 0, y: 0 }} // Inicio del gradiente en la parte superior
        end={{ x: 0, y: 1 }}   // Final del gradiente en la parte inferior
      >
        <View style={styles.container}>
          <Text style={styles.titulo}>Recuperar contraseña</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            placeholder='Correo'
            onChangeText={(text) => setEmail(text)}
          />
          <View style={{ height: 10 }} // Salto de línea
          />
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={styles.gradient}
            >
              <Pressable
                style={styles.button}
                onPress={sendPasswordRest}
              >
                <Text style={styles.buttonText}>Aceptar</Text>
              </Pressable>
            </LinearGradient>
          </View>
          <View style={{ height: 10 }} // Salto de línea
          />
          <View style={styles.buttonContainer}>
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={styles.gradient}
            >
              <Link style={styles.button} href="/(auth)/login">
                <Text style={styles.buttonText}>Volver a Inicio</Text>
              </Link>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  newContainer: {
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 50,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#1b3b6a',
    borderWidth: 2
  },
  titulo: {
    fontSize: 40,
    color: '#1b3b6a',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textInput: {
    padding: 10,
    paddingStart: 20,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1
  },
  buttonContainer: {
    width: '80%',
    margin: 10,
    borderRadius: 5
  },
  gradient: {
    borderRadius: 5,
    overflow: 'hidden'
  },
  button: {
    width: '100%',
    padding: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
