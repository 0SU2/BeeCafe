import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAuth } from '../../../modules/context/auth'
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'
import axios from 'axios'

type OptionType = 'info' | 'orders' | 'logout' | null
interface Pedido {
  car_fecha: string;
  men_platillo: string;
  ped_cantidadTotal: number;
  timestamp?: Date;
}

export default function ProfileTab() {
  const { user } = useLocalSearchParams()
  const { signOut, getUserId } = useAuth()
  const [selectedOption, setSelectedOption] = useState<OptionType>(null)
  const [ dataPedidos, setDataPedidos ] = useState<Pedido[][]>([])
  const [selectedPedido, setSelectedPedido] = useState(null)

  

  const processData = (pedidos: Pedido[]) : Pedido[][] => {
    // Filtrar primero los pedidos que no tienen una fecha válida
    pedidos = pedidos.filter(pedido => pedido.car_fecha);
  
    // Convertir las fechas y ordenar por fecha
    pedidos.forEach(pedido => {
      pedido.timestamp = new Date(pedido.car_fecha);
    });
    pedidos.sort((a, b) => a.timestamp!.getTime() - b.timestamp!.getTime());
  
    // Agrupar pedidos en un rango de 2 minutos
    const groupedPedidos: Pedido[][] = [];
    let tempGroup: Pedido[] = [];
    let currentStartDate: Date | null = null;
  
    pedidos.forEach(pedido => {
      if (!currentStartDate || (pedido.timestamp!.getTime() - currentStartDate.getTime()) / 60000 <= 2) {
        tempGroup.push(pedido);
      } else {
        groupedPedidos.push(tempGroup);
        tempGroup = [pedido];
      }
      currentStartDate = pedido.timestamp!;
    });
  
    if (tempGroup.length > 0) {
      groupedPedidos.push(tempGroup); // Asegúrate de añadir el último grupo si existe
    }
  
    return groupedPedidos;
  };
  

  React.useEffect(() => {
    if(selectedOption == 'orders') {
      axios.get(`http://${process.env.EXPO_PUBLIC_IPV4_OWN}:${process.env.EXPO_PUBLIC_PORT_SERVER}/detalles/${getUserId()}` )
      .then(response => {
        const groupedData = processData(response.data.pedido)
        setDataPedidos(groupedData)
        setSelectedPedido(null)
      })
      .catch(error => {
        console.log(error);
      })
    }
    
  },[selectedOption])

  const handleSelectPedido = (pedido) => {
    console.log("Pedido seleccionado: ", pedido)
    setSelectedPedido(pedido)  // Actualiza el estado con el pedido seleccionado
  }

  const renderOrderDetails = (pedido) => {
    const total = pedido.reduce((acc, item) => acc + parseFloat(item.ped_cantidadTotal), 0);

    return(
    <View style={styles.section}>
      <TouchableOpacity style={styles.arrowButton} onPress={() => setSelectedPedido(null)}>
      <Ionicons name="arrow-back" size={30} color="#007AFF" />
    </TouchableOpacity>
    <Text style={styles.title}>{`Detalles del Pedido`}</Text>
    <FlatList
      data={pedido}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemDetail}>
          <Text style={styles.itemName}>{item.men_platillo}</Text>
          <Text style={styles.itemPrice}>{`$${item.ped_cantidadTotal}`}</Text>
        </View>
      )}
    />
    <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{`Total: $${total.toFixed(2)}`}</Text>
      </View>
    </View>
    )
  }

  // Simulación de historial de pedidos
  const orders = [
    { id: '1', item: 'Pedido 1', date: '2024-05-05' },
    { id: '2', item: 'Pedido 2', date: '2024-05-06' },
    { id: '3', item: 'Pedido 3', date: '2024-05-07' }
  ]

  const options = [
    { id: 'info', label: 'Información', icon: <FontAwesome name="user" size={24} color="#007AFF" /> },
    { id: 'orders', label: 'Historial de Pedidos', icon: <MaterialIcons name="history" size={24} color="#007AFF" /> }
  ]
  
  const renderOrders = () => (
    <>
      <TouchableOpacity style={styles.arrowButton} onPress={() => setSelectedOption(null)}>
        <Ionicons name="arrow-back" size={30} color="#007AFF" />
      </TouchableOpacity>
      {selectedPedido ? (
        renderOrderDetails(selectedPedido)
      ): (
        <FlatList
        data={dataPedidos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.option} onPress={() => handleSelectPedido(item)}>
            <View style={styles.orderItem}>
              <Text style={styles.orderText}>{`Pedido ${index + 1}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      )}
    </>
  )

  const renderContent = () => {
    switch (selectedOption) {
      case 'info':
        return (
          <View style={styles.section}>
            <TouchableOpacity style={styles.arrowButton} onPress={() => setSelectedOption(null)}>
              <Ionicons name="arrow-back" size={30} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.title}>{user}</Text>
          </View>
        )
      case 'orders':
        return renderOrders()
      case 'logout':
        signOut()
        return null
      default:
        return (
          <>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => setSelectedOption(item.id as OptionType)}>
                  {item.icon}
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
              <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </>
        )
    }
  }

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  arrowButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#007AFF',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#DC143C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  orderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  orderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  itemDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center'
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    marginLeft: 40
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',  // Fondo blanco para el contenedor del total
    borderTopWidth: 1,        // Línea para separar la lista de ítems del total
    borderTopColor: '#ccc'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'  // Texto en negro para destacar el total
  }
})
