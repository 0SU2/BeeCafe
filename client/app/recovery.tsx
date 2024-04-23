import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { sendPasswordReset } from '../modules/firebase/fireBaseConfig';

export default function RecoverPassword () {
  const [email, setEmail] = useState<string>('');
  
  const sendPasswordRest = () => {
    sendPasswordReset(email.trim())
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Recuperar contraseña</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        placeholder='Correo'
        onChangeText={(text) => setEmail(text)}
      />
      <View style={{ height: 10 }} //Salto de linea
      />
      <Pressable
        style={{backgroundColor: "#ff5733", borderRadius: 50, width: "30%" }}
        onPress={sendPasswordRest}
      >
       <Text style={{textAlign: "center"}}>Aceptar</Text> 
      </Pressable>
      <View style={{ height: 10 }} //Salto de linea
      />
      <Link style={{backgroundColor: "#fff", borderRadius: 50, width: "30%" , textAlign: "center"}} href="/">Return</Link>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffc600', // Puedes eliminar o ajustar este color de fondo si ya no es necesario
  },
  titulo: {
    textAlign: "center",
    fontSize: 60,
    color: '#1b3b6a',
    fontWeight: 'bold'
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
    borderWidth: 1 // Ancho del marco
  },
})