import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TabsLayou = () => {
  return (
    <Stack >
        <Stack.Screen name='index' options={{ headerShown: false}}/>
        <Stack.Screen name='recovery' options={{headerShown: false}}/>
    </Stack>
  )
}

export default TabsLayou