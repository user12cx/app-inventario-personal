import { View, Text } from 'react-native'
import React from 'react'
import '../global.css'
import { Slot } from 'expo-router'
import AuthProvider, { AuthContext } from '@/context/authContexto'
const _layout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>

  )
}

export default _layout