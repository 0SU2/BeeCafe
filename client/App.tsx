import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [mostrarTarjeta, setMostrarTarjeta] = React.useState(false);

  const abrirTarjeta = () => {
    setMostrarTarjeta(true);
  }

  const cerrarTarjeta = () => {
    // Los valores en el formulario se resetean
    setNombre('');
    setAPaterno('');
    setAMaterno('');
    setCorreo('');
    setContrasena('');
    setConfirmarContrasena('');
    setMostrarTarjeta(false);
  }

const [nombre, setNombre] = React.useState('');
const [aPaterno, setAPaterno] = React.useState('');
const [aMaterno, setAMaterno] = React.useState('');
const [correo, setCorreo] = React.useState('');
const [contrasena, setContrasena] = React.useState('');
const [confirmarContrasena, setConfirmarContrasena] = React.useState('');

//Llenado del formulario
const ingresarNombre = (text: string) => {
  setNombre(text);
}

const ingresarAPaterno = (text: string) => {
  setAPaterno(text);
}

const ingresarAMaterno = (text: string) => {
  setAMaterno(text);
}

const ingresarCorreo = (text: string) => {
  setCorreo(text);
}

const ingresarContrasena = (text: string) => {
  setContrasena(text);
}

const ingresoConfirmarContrasena = (text: string) => {
  setConfirmarContrasena(text);
}

const registroUsuario = () => {
  // Verificación de que se llenó el formulario
  if (!nombre || !aPaterno || !aMaterno || !correo || !contrasena || !confirmarContrasena) {
    alert('Por favor, llene todos los campos.');
    return;
  }

  // Verificación de que las contraseñas sean iguales
  if (contrasena !== confirmarContrasena) {
    alert('La contraseña y la confirmación de contraseña no coinciden.');
    return;
  }
  
  cerrarTarjeta();
}

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#FFC600', '#FFFFFF']} // Amarillo en la parte superior a blanco hacia abajo
        style={styles.background}
        start={{ x: 0, y: 0 }} // Inicio del gradiente en la parte superior
        end={{ x: 0, y: 1 }}   // Final del gradiente en la parte inferior
      />
      <Text style={styles.titulo}>BeeCafe</Text>
      <Text style={styles.subTitle}>Iniciar sesión en su cuenta</Text>
      <TextInput 
        style={styles.textInput}
        placeholder="Correo Electronico" 
      />
      <TextInput 
        style={styles.textInput}
        placeholder="Contraseña" 
      />
      <View style={{ height: 20 }} //Salto de linea 
      /> 
      <LinearGradient
        // Button Linear Gradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.button}>
        <Text style={styles.text}>Iniciar Sesión</Text>
      </LinearGradient>
      
      <View style={styles.registerContainer}
      // Agrega el botón para ingresar datos de un registro
      > 
        <Text style={styles.registerText}>¿No tiene cuenta? </Text>
        <TouchableOpacity onPress={abrirTarjeta} // Abre el formulario para registrar
        > 
          <Text style={styles.registerLink}>Regístrate</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide" 
          transparent={true}
          visible={mostrarTarjeta}
          onRequestClose={cerrarTarjeta}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Registro</Text>
            {/* Formulario de registro */}
            <View style={styles.formContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Nombre"
                value={nombre}
                onChangeText={ingresarNombre}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Apellido Paterno"
                value={aPaterno}
                onChangeText={ingresarAPaterno}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Apellido Materno"
                value={aMaterno}
                onChangeText={ingresarAMaterno}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Correo"
                value={correo}
                onChangeText={ingresarCorreo}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={contrasena}
                onChangeText={ingresarContrasena}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirmar Contraseña"
                secureTextEntry={true}
                value={confirmarContrasena}
                onChangeText={ingresoConfirmarContrasena}
              />
            </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 'auto', marginBottom: 30 }}>
                <TouchableOpacity style={[styles.modalButton, { marginRight: 10, width: 100, backgroundColor: 'red' }]} onPress={cerrarTarjeta}>
                  <Text style={styles.modalButtonText}>Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { width: 100, backgroundColor: 'green' }]} onPress={registroUsuario}>
                  <Text style={styles.modalButtonText}>Registrar</Text>
                </TouchableOpacity>
              </View>
          </View>
        </Modal>
      </View>
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
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
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
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 15,
    color: 'gray',
    fontWeight: 'bold',
  },
  registerLink: {
    fontSize: 15,
    color: '#1b3b6a',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 20,
  },
  modalText: {
    marginTop: 40,
    fontSize: 50,
    color: '#1b3b6a',
    fontWeight: 'bold'
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center', // Centrar el texto
    width: 100, // Ancho del botón
  },
  modalButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
});