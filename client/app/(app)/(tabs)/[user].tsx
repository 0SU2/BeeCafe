import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useAuth } from '../../../modules/context/auth'

export default function PorfileTab() {
  const { user } = useLocalSearchParams()
  const { signOut } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ user }</Text>
      <Button onPress={signOut} title="Salir" color={"orange"}/>
      <View style={styles.separator} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})