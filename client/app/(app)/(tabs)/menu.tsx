import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Modal, Alert } from 'react-native';
import { Card, Button, Portal, Provider, Paragraph } from 'react-native-paper';

import axios from 'axios';

interface ArticuloComida {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
}

interface myComifa {
  men_id: number;
  men_platillo: string;
  men_descripcion: string;
  men_precio: number;
}

const TarjetaComidaMyComida: React.FC<{ comida: myComifa, onAgregarAlCarrito: (id: number) => void, onMostrarDetalles: (comida: myComifa) => void }> = ({ comida, onAgregarAlCarrito, onMostrarDetalles }) => (
  <Card style={styles.card}>
    <Card.Title title={comida.men_platillo} subtitle={comida.men_precio} />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardImage} />
    <Card.Actions>
      <Button mode="contained" onPress={() => onAgregarAlCarrito(comida.men_id)} color="blue">
        Añadir al Carrito
      </Button>
      <Button mode="outlined" onPress={() => onMostrarDetalles(comida)} color="blue">
        Ver Detalles
      </Button>
    </Card.Actions>
  </Card>
);

const ModalDetallesComida: React.FC<{ visible: boolean, comida: myComifa | null, onCerrar: () => void }> = ({ visible, comida, onCerrar }) => (
  <Portal>
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitulo}>{comida?.men_platillo}</Text>
          <Paragraph style={styles.modalDescripcion}>{comida?.men_descripcion}</Paragraph>
          <Text style={styles.modalPrecio}>${comida?.men_precio}</Text>
          <Button mode="contained" onPress={onCerrar} style={styles.botonCerrar}>
            Cerrar
          </Button>
        </View>
      </View>
    </Modal>
  </Portal>
);

export default function PantallaComida() {
  const [comidaSeleccionada, setComidaSeleccionada] = useState<myComifa | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState<'comida' | 'platillos' | 'bebidas'>('comida');
  const [ posts, setPosts ] = useState<myComifa[]>([]);

  React.useEffect(() => {
    if(pestanaActiva == "comida") {
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
    return console.log("se acabo");
    
  }, [pestanaActiva])

  const handleAgregarAlCarrito = (id: number) => {
    console.log(`Producto ${id} añadido al carrito`);
    Alert.alert("Agregado al carrito", id.toString())
  }

  const handleMostrarDetalles = (comida: myComifa) => {
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
            mode={pestanaActiva === 'comida' ? 'contained' : 'outlined'}
            onPress={() => {
              setPestanaActiva('comida')
            }}
            style={styles.tabButton}
          >
            Comida
          </Button>
          <Button
            mode={pestanaActiva === 'platillos' ? 'contained' : 'outlined'}
            onPress={() => {
              setPestanaActiva('platillos')
            }}
            style={styles.tabButton}
          >
            Platillos
          </Button>
          <Button
            mode={pestanaActiva === 'bebidas' ? 'contained' : 'outlined'}
            onPress={() => {
              setPestanaActiva('bebidas')
            }}
            style={styles.tabButton}
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
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    marginHorizontal: 5,
  },
  textoPlaceholder: {
    fontSize: 18,
    marginTop: 20,
  },
});
