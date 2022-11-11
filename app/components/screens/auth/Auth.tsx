import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import tw from "tailwind-rn";
import {useAuth} from "../../../hooks/useAuth";
import Loader from "../../ui/Loader";
import Field from "../../ui/Field";
import Button from "../../ui/Button";
import {styleCenter} from '../../layout/Layout';

interface IData {
    email: string
    password: string
}

const Auth = () => {
    const {isLoading, login, register} = useAuth()
    const [isReg, setIsReg] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const authHandler = async () => {
        if (isReg) await register(email, password)
        else await login(email, password)

        setEmail('')
        setPassword('')
    }
    return (
        <View style={styleCenter}>
            <View style={tw('mx-5 justify-center items-center h-full')}>
                <View style={tw('w-9/12')}>
                    <Text style={tw('text-center text-gray-800 text-2xl font-bold mb-2')}>{
                        isReg ? 'Sign Up' : 'Sign In'
                    }</Text>
                    {isLoading ? <Loader/> : <>
                        <Field onChange={val => setEmail(val)} val={email}
                               placeholder='Enter email'/>
                        <Field onChange={val => setPassword(val)} val={password}
                               placeholder='Enter password'
                               isSecure={true}
                        />

                        <Button onPress={authHandler} title={`Let's go`}/>
                        <Pressable onPress={() => setIsReg(!isReg)}>
                            <Text style={tw('text-gray-800 opacity-30 text-sm text-right')}>
                                {isReg ? 'Login' : 'Register'}
                            </Text>
                        </Pressable>
                    </>}
                </View>
            </View>
        </View>
    );
};


export default Auth;