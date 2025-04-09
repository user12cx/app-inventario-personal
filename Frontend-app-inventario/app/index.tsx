import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react'
import MainLayout from '@/components/MainLayout'
import AuthProvider from '@/context/authContexto'
import "../i18n";
import 'react-native-reanimated';


const index = () => {
    return (
        <BottomSheetModalProvider>
            <AuthProvider>
                <MainLayout />
            </AuthProvider>
        </BottomSheetModalProvider>
    )
}

export default index