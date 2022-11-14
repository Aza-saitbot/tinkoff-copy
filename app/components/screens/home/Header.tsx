import React, {FC} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Padding from "../../ui/Padding";
import Avatar from "../../ui/Avatar";
import tw from 'tailwind-rn'
import {useNavigation} from "@react-navigation/native";
import {Entypo} from '@expo/vector-icons'

interface IHeader {

}

const Header:FC<IHeader> = () => {

    const {navigate}=useNavigation()

    return (
        <Padding style={tw('flex-row items-center')}>
            <Avatar name='Azamat'/>
            <TouchableOpacity
                onPress={()=>navigate('Profile')}
                style={tw('flex-row items-end')}

            >
                <Text
                style={tw('text-2xl text-gray-800 font-bold')}
                >Azamat</Text>
                <Entypo
                name='chevron-small-right'
                size={28}
                style={tw('text-gray-800')}
                />
            </TouchableOpacity>
        </Padding>
    );
};

export default Header;