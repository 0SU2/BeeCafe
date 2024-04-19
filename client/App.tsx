import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
//import logoImage from './assets/icon.png';

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFC600', '#FFFFFF']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <Text style={styles.titulo}>BeeCafe</Text>
      <Image
        source={require('./assets/LogoBeeCafe1.png')}
        style={styles.logo}
      />
      <Text style={styles.subTitle}>Inicie Sesion con su Cuenta</Text>
      <TextInput 
        style={styles.textInput}
        placeholder="Correo Electronico" 
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Contraseña"
        secureTextEntry={true} 
      />
      <View style={{ height: 20 }} />
      <View style={styles.button}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.gradient}>
          <Button
            onPress={() => alert('Prueba de Alerta')}
            title="Iniciar Sesión"
            color="#ffffff"
          />
        </LinearGradient>
        <Text style={styles.textoRegistro}>
        No tienes cuenta?   
        <Text style={styles.linkRegistro} onPress={() => console.log('Llevar al Formulario de Registro')}>
           Regístrate
        </Text>
      </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffc600',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    width: '80%',
    borderRadius: 5,
  },
  gradient: {
    borderRadius: 5,
    overflow: 'hidden', // Mantiene el gradiente dentro del borde redondeado
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
  titulo: {
    fontSize: 90,
    color: '#1b3b6a',
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
    marginTop: 10,
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 5,
  },
  textoRegistro: {
    color: 'black', // o cualquier otro color que estés usando
    fontSize: 16,
    marginTop: 20, // Ajusta el margen según necesites
    textAlign: 'center', // Alinea el texto al centro horizontalmente
  },
  linkRegistro: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
