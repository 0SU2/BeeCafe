import React, { ComponentState, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Modal, Alert } from 'react-native';
import { Card, Button, Portal, Provider, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

import axios from 'axios';
import { comidaCafeteria } from '../../../types/userTypes';
import { useAuth } from '../../../modules/context/auth'; 



const TarjetaComidaMyComida: React.FC<{ comida: comidaCafeteria, onAgregarAlCarrito: (comida:comidaCafeteria) => void, onMostrarDetalles: (comida: comidaCafeteria) => void }> = ({ comida, onAgregarAlCarrito, onMostrarDetalles }) => {
  return (
    <Card style={styles.card}>
      <Card.Title  title={comida.men_platillo} subtitle={`$${comida.men_precio}`}
        titleStyle={{ color: 'white' }}
        subtitleStyle={{ color: 'white' }}
      />
      <Card.Cover source={{ uri: comida.men_img }} style={styles.cardImage} />
      <Card.Content >
        <Paragraph style={{ color: 'white' }}>{comida.men_descripcion}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => onAgregarAlCarrito(comida)} 
          style={{ borderColor: '#3b5998', borderWidth: 2, backgroundColor: 'rgba(255, 245, 112, 0.8)' }}  // Estilos personalizados para cambiar el color de fondo y borde
          labelStyle={{ color: 'black' }} 
        >
          Añadir al Carrito
        </Button>
        <Button
          mode="outlined"
          onPress={() => onMostrarDetalles(comida)}
          style={{ borderColor: 'rgba(255, 245, 112, 0.8)', borderWidth: 2, backgroundColor: 'white' }}  // Estilos personalizados para cambiar el color de fondo y borde
          labelStyle={{ color: 'black' }}  // Cambia el color del texto
        >
          Ver Detalles
        </Button>
      </Card.Actions>
    </Card>
  );
};


const ModalDetallesComida: React.FC<{ visible: boolean, comida: comidaCafeteria | null, onCerrar: () => void }> = ({ visible, comida, onCerrar }) => (
  <Portal>
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitulo}>{comida?.men_platillo}</Text>
          <Paragraph style={styles.modalDescripcion}>{comida?.men_descripcion}</Paragraph>
          <Text style={styles.modalPrecio}>${comida?.men_precio}</Text>
          <Button mode="contained" onPress={onCerrar} style={styles.botonCerrar} labelStyle={{ color: 'black' }} >
            Cerrar
          </Button>
        </View>
      </View>
    </Modal>
  </Portal>
);

export default function PantallaComida() {
  const [comidaSeleccionada, setComidaSeleccionada] = useState<comidaCafeteria | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState<'desayuno' | 'comida' | 'platillos' | 'bebidas'>('comida');
  const [ posts, setPosts ] = useState<comidaCafeteria[]>([]);
  const { addItemsCart, getUserId, getFood, getMenuId, obComida } = useAuth();

  console.log(getUserId());

  React.useEffect(() => {
    if(pestanaActiva == "comida") {
      console.log(process.env.EXPO_PUBLIC_IPV4_OWN);
      axios.get(`http://${process.env.EXPO_PUBLIC_IPV4_OWN}:${process.env.EXPO_PUBLIC_PORT_SERVER}/menuComida`)
      .then(response => {
        setPosts(response.data)
      })
    }

    if(pestanaActiva == "platillos") {
      axios.get(`http://${process.env.EXPO_PUBLIC_IPV4_OWN}:${process.env.EXPO_PUBLIC_PORT_SERVER}/menuPlatillos`)
      .then(response => {
        setPosts(response.data)
      })
    }

    if(pestanaActiva == 'bebidas') {
      axios.get(`http://${process.env.EXPO_PUBLIC_IPV4_OWN}:${process.env.EXPO_PUBLIC_PORT_SERVER}/menuBebidas`)
      .then(response => {
        setPosts(response.data)
      })
    }
    if(pestanaActiva == "desayuno") {
      console.log(process.env.EXPO_PUBLIC_IPV4_OWN);
      axios.get(`http://${process.env.EXPO_PUBLIC_IPV4_OWN}:${process.env.EXPO_PUBLIC_PORT_SERVER}/menuDesayunos`)
      .then(response => {
        setPosts(response.data)
      })
    }
    console.log(posts);
    
    return console.log("se acabo");
    
  }, [pestanaActiva])

  const handleAgregarAlCarrito = async (comida: comidaCafeteria) => {
    console.log(comida.men_id);
    console.log(getUserId());
    // objeto con los datos recopilados 
    const data = {
      car_men_id: comida.men_id,
      car_est_id: getUserId(),
      //car_descripcion: "test",
      //car_cantidadFinal: 24
    }
    addItemsCart(comida)
    console.log(data);
    const response = await axios.post(`http://${process.env.EXPO_PUBLIC_IPV4_OWN}:${process.env.EXPO_PUBLIC_PORT_SERVER}/regcarrito`,{data})
    console.log(response.data);
    
    console.log(getMenuId(),  "uno queeee!?");
    
    // mandar una alerta despues de que se haya agregado el platillo que sea
    // Alert.alert("Agregaste al carrito: ", comida.men_platillo)
  }

  const handleMostrarDetalles = (comida: comidaCafeteria) => {
    setComidaSeleccionada(comida);
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    setComidaSeleccionada(null);
  };


  const renderizarContenido = () => {
    switch (pestanaActiva) {
      case 'comida':
        return (
          <ScrollView style={styles.scrollView}>
            {posts.map(comida => (
              <TarjetaComidaMyComida key={comida.men_id} comida={comida} onAgregarAlCarrito={handleAgregarAlCarrito} onMostrarDetalles={handleMostrarDetalles} />
            ))}
          </ScrollView>
        );
      case 'platillos':

        return (
          <ScrollView style={styles.scrollView}>
            {posts.map(comida => (
              <TarjetaComidaMyComida key={comida.men_id} comida={comida} onAgregarAlCarrito={handleAgregarAlCarrito} onMostrarDetalles={handleMostrarDetalles} />
            ))}
          </ScrollView>
        );
      case 'bebidas':
        return (
          <ScrollView style={styles.scrollView}>
            {posts.map(comida => (
              <TarjetaComidaMyComida key={comida.men_id} comida={comida} onAgregarAlCarrito={handleAgregarAlCarrito} onMostrarDetalles={handleMostrarDetalles} />
            ))}
          </ScrollView>
        );
      case 'desayuno':
      return (
        <ScrollView style={styles.scrollView}>
          {posts.map(comida => (
            <TarjetaComidaMyComida key={comida.men_id} comida={comida} onAgregarAlCarrito={handleAgregarAlCarrito} onMostrarDetalles={handleMostrarDetalles} />
          ))}
        </ScrollView>
      );
      default:
        return null;
    }
  };

  return (
    <Provider>
      <View style={styles.fullScreen}>
        <Text style={styles.titulo}>¿Qué se te antoja?</Text>
        <View style={styles.tabContainer}>
          <Button
            mode={pestanaActiva === 'desayuno' ? 'contained' : 'outlined'}
            onPress={() => setPestanaActiva('desayuno')}
            color={pestanaActiva === 'desayuno' ? 'white' : '#3b5998'}  // Cambia el color del texto/fondo
            style={[styles.tabButton, {
              backgroundColor: pestanaActiva === 'desayuno' ? '#4c669f' : 'transparent',  // Cambia el color de fondo
              borderColor: '#3b5998'  // Puedes definir un color de borde constante si deseas
            }]}
            labelStyle={styles.tabText}
          >
            Desayunos
          </Button>
          
          <Button
            mode={pestanaActiva === 'comida' ? 'contained' : 'outlined'}
            onPress={() => {
              setPestanaActiva('comida')
            }}
            color={pestanaActiva === 'comida' ? 'white' : '#3b5998'}  // Cambia el color del texto/fondo
            style={[styles.tabButton, {
              backgroundColor: pestanaActiva === 'comida' ? '#4c669f' : 'transparent',  // Cambia el color de fondo
              borderColor: '#3b5998'  // Puedes definir un color de borde constante si deseas
            }]}
            labelStyle={styles.tabText}
          >
            Comida
          </Button>
          <Button
            mode={pestanaActiva === 'platillos' ? 'contained' : 'outlined'}
            onPress={() => {
              setPestanaActiva('platillos')
            }}
            color={pestanaActiva === 'platillos' ? 'white' : '#3b5998'}  // Cambia el color del texto/fondo
            style={[styles.tabButton, {
              backgroundColor: pestanaActiva === 'platillos' ? '#4c669f' : 'transparent',  // Cambia el color de fondo
              borderColor: '#3b5998'  // Puedes definir un color de borde constante si deseas
            }]}
            labelStyle={styles.tabText}
          >
            Platillos
          </Button>
          <Button
            mode={pestanaActiva === 'bebidas' ? 'contained' : 'outlined'}
            onPress={() => {
              setPestanaActiva('bebidas')
            }}
            color={pestanaActiva === 'bebidas' ? 'white' : '#3b5998'}  // Cambia el color del texto/fondo
            style={[styles.tabButton, {
              backgroundColor: pestanaActiva === 'bebidas' ? '#4c669f' : 'transparent',  // Cambia el color de fondo
              borderColor: '#3b5998'  // Puedes definir un color de borde constante si deseas
            }]}
            labelStyle={styles.tabText}
          >
            Bebidas
          </Button>
        </View>
        {renderizarContenido()}
        <ModalDetallesComida visible={modalVisible} comida={comidaSeleccionada} onCerrar={handleCerrarModal} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  scrollView: {
    width: '100%',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginVertical: 8,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#3b5998',
  },
  cardImage: {
    height: 200,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescripcion: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalPrecio: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botonCerrar: {
    marginTop: 20,
    borderColor: '#3b5998',
    borderWidth: 2, 
    backgroundColor: 'rgba(255, 245, 112, 0.8)'
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    marginHorizontal: 2,  // Reducir espacio entre botones
    paddingVertical: 0.1,   // Reducir el padding vertical para disminuir la altura
    paddingHorizontal: 0.1, // Reducir el padding horizontal para disminuir el ancho
  },
  // Asegúrate de que todos los botones utilicen este estilo
  tabText: {
    fontSize: 9.5, // Reduce el tamaño de la fuente para que el texto sea más pequeño
    color: 'black'
  },
  textoPlaceholder: {
    fontSize: 18,
    marginTop: 20,
  },
});
