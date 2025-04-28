
import FlashMessage, { showMessage } from "react-native-flash-message";
import { View, Text } from 'react-native'
import React from 'react'
import GastosModal from '@/components/shared/GastosModal'

const gastos = () => {
  return (
    <>

      <GastosModal />

      <FlashMessage position="top" />
    </>
  )
}

export default gastos