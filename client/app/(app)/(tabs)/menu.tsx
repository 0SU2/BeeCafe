import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Modal } from 'react-native';
import { Card, Button, Portal, Provider, Paragraph } from 'react-native-paper';

interface FoodItem {
  id: number
  title: string
  description: string
  price: string
}

const foodList: FoodItem[] = [
  {
    id: 1,
    title: "Pizza Margarita",
    description: "Clásica pizza con tomate y queso mozzarella.",
    price: "$8.99",
  },
  {
    id: 2,
    title: "Hamburguesa con Queso",
    description: "Hamburguesa de res con queso cheddar y salsa especial.",
    price: "$9.99",
  },
  {
    id: 3,
    title: "Ensalada César",
    description: "Ensalada fresca con pollo, crutones y queso parmesano.",
    price: "$7.99",
  },
];

const FoodCard: React.FC<{ food: FoodItem, onAddToCart: (id: number) => void, onShowDetails: (food: FoodItem) => void }> = ({ food, onAddToCart, onShowDetails }) => (
  <Card style={styles.card}>
    <Card.Title title={food.title} subtitle={food.price} />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardImage} />
    <Card.Actions>
      <Button mode="contained" onPress={() => onAddToCart(food.id)} color="blue">
        Añadir al Carrito
      </Button>
      <Button mode="outlined" onPress={() => onShowDetails(food)} color="blue">
        Ver Detalles
      </Button>
    </Card.Actions>
  </Card>
);

const FoodDetailsModal: React.FC<{ visible: boolean, food: FoodItem | null, onClose: () => void }> = ({ visible, food, onClose }) => (
  <Portal>
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{food?.title}</Text>
          <Paragraph style={styles.modalDescription}>{food?.description}</Paragraph>
          <Text style={styles.modalPrice}>{food?.price}</Text>
          <Button mode="contained" onPress={onClose} style={styles.closeButton}>
            Cerrar
          </Button>
        </View>
      </View>
    </Modal>
  </Portal>
)

export default function TabOneScreen() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleAddToCart = (id: number) => {
    console.log(`Producto ${id} añadido al carrito`);
  };

  const handleShowDetails = (food: FoodItem) => {
    setSelectedFood(food);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedFood(null);
  };

  return (
    <Provider>
      <View style={styles.fullScreen}>
        <Text style={styles.title}>¿Qué se te antoja?</Text>
        <ScrollView style={styles.scrollView}>
          {foodList.map(food => (
            <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} onShowDetails={handleShowDetails} />
          ))}
        </ScrollView>
        <FoodDetailsModal visible={isModalVisible} food={selectedFood} onClose={handleCloseModal} />
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
  title: {
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
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
  },
});
