import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Modal } from 'react-native';
import { Card, Button, Portal, Provider, Paragraph } from 'react-native-paper';

interface ArticuloComida {
  id: number;
  titulo: string;
  descripcion: string;
  precio: string;
}

const listaComida: ArticuloComida[] = [
  {
    id: 1,
    titulo: "Hamburguesa con Queso",
    descripcion: "Hamburguesa de res con queso cheddar y salsa especial.",
    precio: "$9.99",
  },
  {
    id: 2,
    titulo: "Pizza Margarita",
    descripcion: "Clásica pizza con tomate y queso mozzarella.",
    precio: "$8.99",
  },
  {
    id: 3,
    titulo: "Sándwich Club",
    descripcion: "Sándwich con jamón, pavo, tocino y queso.",
    precio: "$7.99",
  },
];

const listaPlatillos: ArticuloComida[] = [
  {
    id: 1,
    titulo: "Ensalada César",
    descripcion: "Ensalada fresca con pollo, crutones y queso parmesano.",
    precio: "$7.99",
  },
  {
    id: 2,
    titulo: "Tacos al Pastor",
    descripcion: "Tacos con carne de cerdo marinada y piña.",
    precio: "$6.99",
  },
  {
    id: 3,
    titulo: "Sopa de Tortilla",
    descripcion: "Sopa tradicional con tiras de tortilla y aguacate.",
    precio: "$5.99",
  },
];

const TarjetaComida: React.FC<{ comida: ArticuloComida, onAgregarAlCarrito: (id: number) => void, onMostrarDetalles: (comida: ArticuloComida) => void }> = ({ comida, onAgregarAlCarrito, onMostrarDetalles }) => (
  <Card style={styles.card}>
    <Card.Title title={comida.titulo} subtitle={comida.precio} />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardImage} />
    <Card.Actions>
      <Button mode="contained" onPress={() => onAgregarAlCarrito(comida.id)} color="blue">
        Añadir al Carrito
      </Button>
      <Button mode="outlined" onPress={() => onMostrarDetalles(comida)} color="blue">
        Ver Detalles
      </Button>
    </Card.Actions>
  </Card>
);

const ModalDetallesComida: React.FC<{ visible: boolean, comida: ArticuloComida | null, onCerrar: () => void }> = ({ visible, comida, onCerrar }) => (
  <Portal>
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitulo}>{comida?.titulo}</Text>
          <Paragraph style={styles.modalDescripcion}>{comida?.descripcion}</Paragraph>
          <Text style={styles.modalPrecio}>{comida?.precio}</Text>
          <Button mode="contained" onPress={onCerrar} style={styles.botonCerrar}>
            Cerrar
          </Button>
        </View>
      </View>
    </Modal>
  </Portal>
);

export default function PantallaComida() {
  const [comidaSeleccionada, setComidaSeleccionada] = useState<ArticuloComida | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [pestanaActiva, setPestanaActiva] = useState<'comida' | 'platillos' | 'bebidas'>('comida');

  const handleAgregarAlCarrito = (id: number) => {
    console.log(`Producto ${id} añadido al carrito`);
  };

  const handleMostrarDetalles = (comida: ArticuloComida) => {
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
            {listaComida.map(comida => (
              <TarjetaComida key={comida.id} comida={comida} onAgregarAlCarrito={handleAgregarAlCarrito} onMostrarDetalles={handleMostrarDetalles} />
            ))}
          </ScrollView>
        );
      case 'platillos':
        return (
          <ScrollView style={styles.scrollView}>
            {listaPlatillos.map(comida => (
              <TarjetaComida key={comida.id} comida={comida} onAgregarAlCarrito={handleAgregarAlCarrito} onMostrarDetalles={handleMostrarDetalles} />
            ))}
          </ScrollView>
        );
      case 'bebidas':
        return <Text style={styles.textoPlaceholder}>Contenido de "Bebidas"</Text>;
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
            onPress={() => setPestanaActiva('comida')}
            style={styles.tabButton}
          >
            Comida
          </Button>
          <Button
            mode={pestanaActiva === 'platillos' ? 'contained' : 'outlined'}
            onPress={() => setPestanaActiva('platillos')}
            style={styles.tabButton}
          >
            Platillos
          </Button>
          <Button
            mode={pestanaActiva === 'bebidas' ? 'contained' : 'outlined'}
            onPress={() => setPestanaActiva('bebidas')}
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
