import React from 'react'
import MainLayout from '@/components/MainLayout'
import AuthProvider from '@/context/authContexto'
import "../i18n";
import 'react-native-reanimated';

const index = () => {
    return (

        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    )
}

export default index