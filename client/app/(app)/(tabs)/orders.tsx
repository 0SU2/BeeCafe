import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../../../modules/context/auth';
import { comidaCafeteria } from '../../../types/userTypes';
import { agregarAlCarrito } from '../../../api';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

export default function OrderLayoutTab() {
  const [selectedTab, setSelectedTab] = useState('carrito');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState<comidaCafeteria[]>([]);
  const [showDeleteIcons, setShowDeleteIcons] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [cartItemsFood, setCartItemsFood] = useState<comidaCafeteria[]>([])
  const { getAddedItemsCart, removeItemCart, deleteAllItemsCart, getUserId } = useAuth();
  const itemsCart = getAddedItemsCart();
  
  React.useEffect(() => {
    setCartItemsFood(getAddedItemsCart())
    
  }, [itemsCart]);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const removeItem = async (itemId: number) => {
    const updateCartItem = cartItemsFood.filter(item => item.men_id !== itemId);
    removeItemCart(updateCartItem)
    console.log(itemId,"hereeeee?");

    const data = {
      car_est_id: getUserId(),
      car_men_id: itemId
    };
    const response = await axios.delete(`http://${process.env.EXPO_PUBLIC_IPV4_OWN}:${process.env.EXPO_PUBLIC_PORT_SERVER}/eliminarmenu`,{data})
    console.log(response.data);

  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setOrderDetails([...cartItemsFood]);
    setCartItemsFood([]);
    setShowDeleteIcons(false); // Ocultar los íconos de eliminar al realizar el pedido
  };

  const resetOrderState = () => {
    setOrderPlaced(false);
    setPaymentSuccess(false);
    setShowDeleteIcons(true); // Mostrar los íconos de eliminar nuevamente
  };

  const cancelOrder = () => {
    setTimeout(() => {
      resetOrderState();
    }, 0);
  };

  const payOrder = async() => {
    // hacer una peticion post al mysql con la informacion del usuario
    const response = await agregarAlCarrito(getUserId());
    if(!response.data.success) {
      // en caso de error no continuar
      Alert.alert("Error", "Error al crear su pedido");
      return;
    }
    console.log(response);
    setPaymentSuccess(true);
    setTimeout(() => {
      resetOrderState();
    }, 3000);
    deleteAllItemsCart([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'carrito' && styles.selectedTab]}
          onPress={() => handleTabChange('carrito')}>
          <Text style={styles.tabText}>Carrito</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'pedidos' && styles.selectedTab]}
          onPress={() => handleTabChange('pedidos')}>
          <Text style={styles.tabText}>Pedidos</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'carrito' ? (
        <View style={styles.cartContent}>
          <FlatList
            data={cartItemsFood}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text>{item.men_platillo}</Text>
                <Text>Precio: ${item.men_precio.toString()}</Text>
                {showDeleteIcons && (
                  <TouchableOpacity onPress={() => removeItem(item.men_id)}>
                    <FontAwesome5 name="trash-alt" size={24} color="red" />
                  </TouchableOpacity>
                )}
              </View>
            )}
            keyExtractor={(item) => item.men_id.toString()}
          />
          <Text style={styles.total}>Total: ${cartItemsFood.reduce((total, item) => total + parseFloat(item.men_precio), 0).toFixed(2)}</Text>
          <Button title="Realizar Pedido" onPress={placeOrder} />
        </View>
      ) : (
        <ScrollView style={styles.orderDetails}>
          {orderPlaced ? (
            <View style={styles.orderCard}>
              <Text style={styles.orderTitle}>Detalles del Pedido</Text>
              {orderDetails.map(item => (
                <View key={item.men_id} style={styles.orderItem}>
                  <Text>{item.men_platillo}</Text>
                  <Text>Precio: ${item.men_precio}</Text>
                </View>
              ))}
              <Text style={styles.total}>Total: ${orderDetails.reduce((total, item) => total + parseFloat(item.men_precio), 0).toFixed(2)}</Text>
              <View style={styles.orderActions}>
                {!paymentSuccess && (
                  <Button title="Cancelar Pedido" onPress={cancelOrder} color={"red"} />
                )}
                {!paymentSuccess ? (
                  <Button title="Pagar Pedido" onPress={payOrder} color={"green"} />
                ) : (
                  <View style={styles.paymentSuccess}>
                    <FontAwesome5 name="check-circle" size={24} color="green" />
                    <Text style={styles.paymentSuccessText}>Pago Exitoso</Text>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <Text style={styles.noOrderText}>No se ha realizado ningún pedido</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paymentSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentSuccessText: {
    marginLeft: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedTab: {
    backgroundColor: 'lightblue',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartContent: {
    flex: 1,
  },
  total: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  orderDetails: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    marginBottom: 10,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  noOrderText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});
