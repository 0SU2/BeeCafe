import React from 'react'
import { Stack, Tabs } from 'expo-router'

export default function AuthTabs() {
  return (
    <Stack>
      <Stack.Screen name='login' options={{ headerShown: false}}/>
      <Stack.Screen name='recovery' options={{ headerShown: false}}/>
    </Stack>
  )
}

