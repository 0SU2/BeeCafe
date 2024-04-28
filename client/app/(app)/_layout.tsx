import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function LayoutTabs () {
  return (
    <Stack screenOptions={{ headerShown: false}}>
      <Stack.Screen name='(tabs)' />
    </Stack>
  )

}
