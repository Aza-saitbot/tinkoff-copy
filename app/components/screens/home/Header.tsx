import React, {FC} from 'react';
import {View, Text} from 'react-native';
import Padding from "../../ui/Padding";
import Avatar from "../../ui/Avatar";
import tw from 'tailwind-rn'

interface IHeader {

}

const Header:FC<IHeader> = () => {
    return (
        <Padding style={tw('flex-row items-center')}>
            <Avatar name='Azamat'/>
        </Padding>
    );
};

export default Header;