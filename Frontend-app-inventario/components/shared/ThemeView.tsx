import { View, Text, ViewProps } from 'react-native'
import React from 'react'

interface Prop extends ViewProps{
    className?: string

}
const ThemeView = ({children}: Prop) => {
  return (
    <View className='bg-white dark:bg-slate-800'>
      {children}
    </View>
  )
}

export default ThemeView