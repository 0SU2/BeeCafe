import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';

interface FoodItem {
  id: number;
  title: string;
  description: string;
  price: string;
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

const FoodCard: React.FC<{ food: FoodItem, onAddToCart: (id: number) => void }> = ({ food, onAddToCart }) => (
  <Card style={styles.card}>
    <Card.Title title={food.title} subtitle={food.price} />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardImage} />
    <Card.Actions>
      <Button mode="contained" onPress={() => onAddToCart(food.id)} color="blue">
        Añadir al Carrito
      </Button>
    </Card.Actions>
  </Card>
);

export default function TabOneScreen() {
  const handleAddToCart = (id: number) => {
    console.log(`Producto ${id} añadido al carrito`);
  };

  return (
    <View style={styles.fullScreen}>
      <Text style={styles.title}>¿Que se te antoja?</Text>
      <ScrollView style={styles.scrollView}>
        {foodList.map(food => (
          <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
        ))}
      </ScrollView>
    </View>
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
});
