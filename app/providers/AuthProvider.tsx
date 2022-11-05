import {onAuthStateChanged, User} from "firebase/auth";
import {addDoc, collection} from 'firebase/firestore'
import React, {createContext, FC, useEffect, useMemo, useState} from "react";
import {Alert} from "react-native";
import {auth, db, login, logout, register} from "../firebase";

interface IContext {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    register: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<IContext>({} as IContext)

interface Props {
    children: React.ReactNode;
}
export const AuthProvider:FC<Props> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const registerHandler = async (email: string, password: string) => {
        setIsLoading(true)
        try {

            const {user} = await register(email, password)
            await addDoc(collection(db, 'users'), {
                _id: user.uid,
                displayName: 'No name'
            })

        } catch (e) {
            Alert.alert('Err registration', e)
        } finally {
            setIsLoading(false)
        }
    }
    const loginHandler = async (email: string, password: string) => {
        setIsLoading(true)
        try {

            const {user} = await login(email, password)
            await addDoc(collection(db, 'users'), {
                _id: user.uid,
                displayName: 'No name'
            })

        } catch (e) {
            Alert.alert('Err login', e)
        } finally {
            setIsLoading(false)
        }
    }
    const logoutHandler = async () => {
        setIsLoading(true)
        try {
            await logout()
        } catch (e) {
            Alert.alert('Err logout', e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        // подписываемся, следим за авторизации поль-ля
        // каждый раз когда выходим из системы, срабатывает колбэк
        // если есть , то возвращает user, иначе null
       onAuthStateChanged(auth,user=>{
           setUser(user || null)
           // после авторизации, произошло изменения
           // приложения что бы понимал, на каком моменте мы уже авторизовались
           setIsLoadingInitial(false)
       })
    },[])


    const value = useMemo(() => ({
        user,
        isLoading,
        // функции не будут пересоздаваться, если user и isLoading не изменяться
        login:loginHandler,
        logout:logoutHandler,
        register:registerHandler
    }), [user,isLoading])

    return <AuthContext.Provider value={value}>{
        !isLoadingInitial && children
    }</AuthContext.Provider>
}