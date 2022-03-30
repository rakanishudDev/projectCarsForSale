import {useState} from 'react'
import {useRouter} from 'next/router'
import { UseAuthStatus } from './useAuthStatus'
import Loading from '../components/comps/Loading'
export const withPrivate = (Component) => {
    return function WithPublic() {
        const {loggedIn, checkingStatus} = UseAuthStatus()
        const router = useRouter()
        if (checkingStatus) {
            
            return <Loading />
        }
        if (!loggedIn) {
            router.replace("/auth/sign-in")
            return <Loading />
        }
        return <Component />
        
    }
}

export const withPublic = (Component) => {
    return function WithPublic() {
        const {loggedIn, checkingStatus} = UseAuthStatus()
        const router = useRouter()
        if (checkingStatus) {
            return <Loading />
        }
        if (loggedIn) {
            router.replace("/")
            return <Loading />
        } else {
            console.log('Not Logged-In')
            return <Component />
        }
        
        
    }
}