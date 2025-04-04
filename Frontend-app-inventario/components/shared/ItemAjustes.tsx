import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

interface PropsAjustes {
    title: string;
    icons: string;
    iconSize?: number;
}

const ItemAjustes:React.FC<PropsAjustes> = ({title ,icons, iconSize}) => {
    return (
        <TouchableOpacity
            className="flex-row items-center py-3 px-5 active:bg-gray-900 mb-1"
        >
            <View style={{ marginRight: 20 }}>
                <AntDesign name={icons} size={iconSize} />
            </View>
            <Text className=" font-bold text-[20px]">
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default ItemAjustes