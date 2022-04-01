import { useEffect, useState } from 'react'
import {getAuth} from 'firebase/auth'
import {getDocs, collection, query, where, orderBy, getDoc, doc} from 'firebase/firestore'
import ListingItem from './ListingItem'
import { db } from '../../firebase.config'
import {useRouter} from 'next/router'
import Loading from './Loading'



const MyListings = () => {
    const [listings, setListings] = useState(null)
    const [favorites, setFavorites] = useState(null)
    const [toggle, setToggle] = useState('listings')
    const auth = getAuth()
    const userId = auth.currentUser.uid

    const router = useRouter()
    const onEdit = (listingId) => router.push('/account/edit-listings/' + listingId) 

    useEffect(() => {

        const fetchUserListings = async () => {
            const collectionRef = collection(db, 'transport')
            const q = query(collectionRef, where('userRef', '==', userId), orderBy('timestamp', 'desc'))
            const querySnap = await getDocs(q)
            let array = []
            if (querySnap) {
                querySnap.forEach(doc => {
                    return array.push({id: doc.id, data: doc.data()})
                })
                setListings(array)
            }

            const userRef = doc(db, 'users', userId)
            const userSnap = await getDoc(userRef)
            let array3 = []
            userSnap.data().favorites.map( async (listing) => {
                const carRef = doc(db, 'transport', listing)
                const carSnap = await getDoc(carRef);
                return array3.push({id: carSnap.id, data: carSnap.data()}) 
            })
            setFavorites(array3)
        }
        fetchUserListings()
    }, [userId])
    console.log(listings)
  
  return (<>

   <div style={{display: "flex", gap: "3rem", marginTop: "1rem"}}>
    <div style={{display: "flex", flexDirection: "column"}}>
        <div>
        <h2  style={{width: "134px",cursor: "pointer", fontWeight: "500",marginTop: "0", padding: "0 0.5rem"}}>{toggle === 'listings' ? "My listings" : "Favorites"}</h2>
        </div>
        
        <div>
        <h2 onClick={() => setToggle(toggle === 'favorites' ? 'listings' :'favorites')} style={{fontSize: "1.3rem", color: "gray",width: "100%", cursor: "pointer", fontWeight: "500", padding: "0 0.5rem"}}>{toggle !== 'listings' ? "My listings" : "Favorites"}</h2>
        </div>
    </div>
    
   { toggle === 'listings' ? <div className="listingItemsContainer">
        {listings ? listings.map(doc => {
            return <ListingItem myPrivate={true} key={doc.id} id={doc.id} data={doc.data} onEdit={onEdit}  />
        }) : <div className="loadingContainer"><Loading /></div>}
        
    </div>
    :
    <div className="listingItemsContainer">
        {favorites ? favorites.map(doc => {
         
            return <ListingItem myPrivate={false} key={doc.id} id={doc.id} data={doc.data} onEdit={onEdit}  />
        }) : <div className="loadingContainer"><Loading /></div>}
        
    </div>}
    </div>
    </>
  )
}

export default MyListings