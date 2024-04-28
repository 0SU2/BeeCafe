import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const tabsLayoutMenu = () => {
  return (
    
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen 
        name='menu' 
        options={{ 
          title: "Menu",
          headerTitle: "Menu",
          tabBarIcon: ({ color }) => <FontAwesome5 name="utensils" size={24} color={color} />
        }}  
      />
      <Tabs.Screen 
        name='orders' 
        options={{ 
          title: "Pedidos",
          headerTitle: "Pedidos",
          tabBarIcon: ({ color }) => <FontAwesome5 name="shopping-cart" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name='[user]'
        options={{
          title: "Perfil",
          headerTitle: "Perfil",
          tabBarIcon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />
        }}
      />
    </Tabs>
  )
}

export default tabsLayoutMenu

const styles = StyleSheet.create({})