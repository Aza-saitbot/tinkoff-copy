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
            console.log('registerHandler')
            const {user} = await register(email, password)
            console.log('REGISTER user',user)
            const dbRef = collection(db, "users");
            const data = {
                _id: user.uid,
                displayName: 'No name'
            }
            console.log('dbRef',dbRef)
            console.log('data',data)
            const docRef=await addDoc(dbRef, data)
            console.log('SUCCESS ADDED docRef=',docRef)

        } catch (e) {
            Alert.alert('ERRRRRRRROR registration', e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const loginHandler = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            await login(email, password)
        } catch (e) {
            Alert.alert('Err login', e.message)
        } finally {
            setIsLoading(false)
        }
    }
    const logoutHandler = async () => {
        setIsLoading(true)
        try {
            await logout()
        } catch (e) {
            Alert.alert('Err logout', e.message)
        } finally {
            setIsLoading(false)
        }
    }

    // подписываемся, следим за авторизации поль-ля
    // каждый раз когда выходим из системы, срабатывает колбэк
    // если есть, то возвращает user, иначе null
    useEffect(()=> onAuthStateChanged(auth,user=>{
        console.log('onAuthStateChanged',user)
           setUser(user || null)
           // после авторизации, произошло изменения
           // приложения что бы понимал, на каком моменте мы уже авторизовались
           setIsLoadingInitial(false)
       }),[])


    const value = useMemo(() => ({
        user,
        isLoading,
        //для чего используем useMemo, функции не будут пересоздаваться, если user и isLoading не изменяться
        login:loginHandler,
        logout:logoutHandler,
        register:registerHandler
    }), [user,isLoading])

    return <AuthContext.Provider value={value}>{
        !isLoadingInitial && children
    }</AuthContext.Provider>
}