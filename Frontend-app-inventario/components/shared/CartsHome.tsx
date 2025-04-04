import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

interface CartItemProps {
  key:number,
  title: string
  subtitle: string
  price: string
}

const CartItem: React.FC<CartItemProps> = ({ title, subtitle, price,key }) => {
  return (

    <TouchableOpacity className="w-[170px] h-[105px] shadow-lg rounded-xl overflow-hidden">
      <LinearGradient
        colors={['#002661', '#0074C1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 p-4 justify-between"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-lg font-bold">{title}</Text>
          <Ionicons name="card-sharp" size={24} color="#FFD700" />
        </View>

        <Text className="text-white text-sm opacity-80">{subtitle}</Text>
        <Text className="text-white text-xl font-semibold mt-1">{price}</Text>
      </LinearGradient>
    </TouchableOpacity>


  )
}

export default CartItem