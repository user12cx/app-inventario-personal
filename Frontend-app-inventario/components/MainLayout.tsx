import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext, useAuth } from '@/context/authContexto'
import { Redirect } from 'expo-router'

const MainLayout = () => {
    const { user } = useAuth()
    console.log(user)

    if (user) {
        return (<Redirect href={'/(Stack)/Login'} />)
        
    } else {
        return (<Redirect href={'/(Drawer)/Home'} />)
    }

}

export default MainLayout