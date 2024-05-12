import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Image, Button, Pressable} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useAuth } from '../../modules/context/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getEst, postEst} from '../../api';
import { useTogglePasswordVisibility } from '../../modules/components/togglePassword';

export default function App() {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
  
  // valores que recibe del registro
  const RegValues = (name:string, value:string) => forms({...input, [name]: value});

  const [mostrarTarjeta, setMostrarTarjeta] = React.useState(false);

  const [input,forms] = React.useState({
    nombre:"",
    apePaterno:"",
    apeMaterno:"",
    correo:"",
    contrasena:"",
  });

    // funcion signIn para la validacion del usuario y cambiarlo a la view 
  // del menu
  const { signIn } =  useAuth();  
  
  const registro = () => {
    //console.log(input.nombre,input.apePaterno,input.apeMaterno,input.correo,input.contrasena);
    //postEst(input.nombre,input.apePaterno,input.apeMaterno,input.correo,input.contrasena);
    console.log(input);
    
    postEst(forms);

  }
  const abrirTarjeta = () => {
    setMostrarTarjeta(true);
  }

  const cerrarTarjeta = () => {
    setMostrarTarjeta(false);
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

      <Image
        source={require('../../assets/images/LogoBeeCafe1.png')}
        style={styles.logo}
      />
      
      <Text style={styles.subTitle}>Iniciar sesión en su cuenta</Text>
      
      <View style={styles.inputsContainer} >
        <TextInput 
          value={input.correo}
          onChangeText={(text) => RegValues("correo", text)}
          style={styles.inputField}
          placeholder="Correo Electronico" 
        />
      </View>

      <View style={styles.inputsContainer} >
        <TextInput  
          style={styles.inputField}
          secureTextEntry={passwordVisibility}
          value={input.contrasena}
          onChangeText={(text) => RegValues("contrasena",text)}
          placeholder="Contraseña" 
        />
        <Pressable onPress={handlePasswordVisibility} >
          <Ionicons
            //name={rightIcon}
            color="#000"
            size={20}
          />
        </Pressable>
      </View>

      <View style={styles.button}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.gradient}>
          <Button
            onPress={() => {
              signIn(input.correo, input.contrasena)
            }}
            title="Iniciar Sesión"
            color="#ffffff"
          />
        </LinearGradient>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Recuperar </Text>
        <Link href="/(auth)/recovery" style={styles.registerLink}>contraseña</Link>
      </View>     

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
                placeholder="Nombreee"
                value={input.nombre}
                onChangeText={ (text) => RegValues("nombre",text) }
              />
              <TextInput
                style={styles.textInput}
                placeholder="Apellido Paterno"
                value={input.apePaterno}
                onChangeText={ (text) => RegValues("apePaterno",text) }
              />
              <TextInput
                style={styles.textInput}
                placeholder="Apellido Materno"
                value={input.apeMaterno}
                onChangeText={ (text) => RegValues("apeMaterno",text) }
              />
              <TextInput
                style={styles.textInput}
                placeholder="Correo"
                value={input.correo}
                onChangeText={ (text) => RegValues("correo",text) }
              />
              <TextInput
                style={styles.textInput}
                placeholder="Contraseña"
                secureTextEntry={true}
                //value={input.contrasena}
                //onChangeText={ingresarContrasena}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirmar Contraseña"
                secureTextEntry={true}
                value={input.contrasena}
                onChangeText={ (text) => RegValues("contrasena",text) }
              />
            </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 'auto', marginBottom: 30 }}>
                <TouchableOpacity style={[styles.modalButton, { marginRight: 10, width: 100, backgroundColor: 'red' }]} onPress={cerrarTarjeta}>
                  <Text style={styles.modalButtonText}>Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { width: 100, backgroundColor: 'green' }]} 
                onPress={registro}>
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
  gradient: {
    borderRadius: 5,
    overflow: 'hidden', // Mantiene el gradiente dentro del borde redondeado
  },
  button: {
    width: '80%',
    margin: 10,
    borderRadius: 5,
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
    margin: 10,
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 5,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
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
  inputsContainer: {
    margin: 5,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000'
  },
  inputField: {
    marginLeft: 10,
    padding: 12,
    fontSize: 14,
    width: '84%'
  }
});