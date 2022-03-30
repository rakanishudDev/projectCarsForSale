import {useState} from 'react'
import {useRouter} from 'next/router'
import { UseAuthStatus } from './useAuthStatus'
import Loading from '../components/comps/Loading'
export const withPrivate = (Component) => {
    return function WithPublic() {
        const {loggedIn, checkingStatus} = UseAuthStatus()
        const router = useRouter()
        if (checkingStatus) {
            
            return <div className="loadingContainer"><Loading /></div>
        }
        if (!loggedIn) {
            router.replace("/auth/sign-in")
            return <div className="loadingContainer"><Loading /></div>
        }
        return <Component />
        
    }
}

export const withPublic = (Component) => {
    return function WithPublic() {
        const {loggedIn, checkingStatus} = UseAuthStatus()
        const router = useRouter()
        if (checkingStatus) {
            return <div className="loadingContainer"><Loading /></div>
        }
        if (loggedIn) {
            router.replace("/")
            return <div className="loadingContainer"><Loading /></div>
        } else {
            console.log('Not Logged-In')
            return <Component />
        }
        
        
    }
}