import React, {FC} from 'react';
import {View, Text} from 'react-native';
import tw from 'tailwind-rn'

interface IPadding {
    children:React.ReactNode
    style?:any
}
const Padding:FC<IPadding> = ({children,style={}}) => {
    return (
        <View style={{...tw('px-4'),...style}}>
            {children}
        </View>
    );
};

export default Padding;