import {collection, onSnapshot, query } from "firebase/firestore";
import {useEffect, useState} from "react";
import {useAuth} from "../../../hooks/useAuth";
import {db} from "../../../firebase";


interface IProfile {
    _id: string
    displayName: string
    docId: string
}

export const useProfile = () => {
    const {user}=useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [profile, setProfile] = useState({} as IProfile)
    const [name, setName] = useState('')

// useEffect(()=>onSnapshot(query(collection(db,'users'),
//     where('_id','==',user?.uid),limit(1)),snapshot => {
//     const profile=snapshot.docs.map(d=>({
//         ...(d.data() as Omit<IProfile, docId>)
//     }))
//     }
//     )),[])
}