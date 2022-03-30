import {createContext} from 'react'
import {useState} from 'react'



export const GlobalState = createContext(null)



const GlobalProvider = ({children}) => {
     const [cars, setCars] = useState(null);
    
    return (
    <GlobalState.Provider value={[cars, setCars]}>
         {children}
    </GlobalState.Provider>
)}
export default GlobalProvider