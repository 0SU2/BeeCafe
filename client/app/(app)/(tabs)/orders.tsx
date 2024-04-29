import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function OrderLayoutTab() {
  const [selectedTab, setSelectedTab] = useState('carrito');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Producto 1', price: 10.99 },
    { id: 2, name: 'Producto 2', price: 15.99 },
    { id: 3, name: 'Producto 3', price: 20.99 },
    { id: 4, name: 'Producto 4', price: 22.99 },
    { id: 5, name: 'Producto 5', price: 5.99 },
    { id: 6, name: 'Producto 6', price: 4.99 }
  ]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState([] as { id: number; name: string; price: number }[]);
  const [showDeleteIcons, setShowDeleteIcons] = useState(true);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const removeItem = (itemId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setOrderDetails([...cartItems]);
    setCartItems([]);
    setShowDeleteIcons(false); // Ocultar los íconos de eliminar al realizar el pedido
  };

  const cancelOrder = () => {
    setOrderPlaced(false)
    setShowDeleteIcons(true); // Mostrar los íconos de eliminar nuevamente al cancelar el pedido
  };

  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const payOrder = () => {

    // Lógica para pagar el pedido
    setPaymentSuccess(true)
    setShowDeleteIcons(true); // Mostrar los íconos de eliminar nuevamente al pagar el pedido
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
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text>{item.name}</Text>
                <Text>Precio: ${item.price}</Text>
                {showDeleteIcons && (
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <FontAwesome5 name="trash-alt" size={24} color="red" />
                  </TouchableOpacity>
                )}
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <Text style={styles.total}>Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</Text>
          <Button title="Realizar Pedido" onPress={placeOrder} />
        </View>
      ) : (
        <ScrollView style={styles.orderDetails}>
          {orderPlaced ? (
          <View style={styles.orderCard}>
            <Text style={styles.orderTitle}>Detalles del Pedido</Text>
            {orderDetails.map(item => (
              <View key={item.id} style={styles.orderItem}>
                <Text>{item.name}</Text>
                <Text>Precio: ${item.price}</Text>
              </View>
            ))}
              <Text style={styles.total}>Total: ${orderDetails.reduce((total, item) => total + item.price, 0).toFixed(2)}</Text>
              <View style={styles.orderActions}></View>
            <View style={styles.orderActions}>
              <Button title="Cancelar Pedido" onPress={cancelOrder} />
                {!paymentSuccess ? (
              <Button title="Pagar Pedido" onPress={payOrder} />
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
})
