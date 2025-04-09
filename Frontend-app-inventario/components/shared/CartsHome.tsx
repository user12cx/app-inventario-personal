import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

interface CartItemProps {
  key:number,
  title: string
  subtitle: string
  price: string
}
const onpressCart=()=>{
  router.push("/(Drawer)/targetas")
}
const CartItem: React.FC<CartItemProps> = ({ title, subtitle, price }) => {
  return (

    <TouchableOpacity  onPress={onpressCart} className="w-[170px] h-[105px] shadow-lg rounded-xl overflow-hidden">
      <LinearGradient
        colors={['#1a535c', '#4ecdc4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 p-4 justify-between"
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-lg font-bold">{title}</Text>
          <Ionicons name="card-sharp" size={24} color="#595959" />
        </View>

        <Text className="text-white text-sm opacity-80">{subtitle}</Text>
        <Text className="text-white text-xl font-semibold mt-1">{price}</Text>
      </LinearGradient>
    </TouchableOpacity>


  )
}

export default CartItem