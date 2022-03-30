import { useEffect, useState } from 'react'
import {getAuth} from 'firebase/auth'
import {getDocs, collection, query, where, orderBy} from 'firebase/firestore'
import ListingItem from './ListingItem'
import { db } from '../../firebase.config'
import {useRouter} from 'next/router'
import Loading from './Loading'



const MyListings = () => {
    const [listings, setListings] = useState(null)
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
        }
        fetchUserListings()
    }, [userId])
    console.log(listings)
  
  return (<>
   
    <div className="listingItemsContainer">
        {listings ? listings.map(doc => {
            return <ListingItem myPrivate={true} key={doc.id} id={doc.id} data={doc.data} onEdit={onEdit}  />
        }) : <div className="loadingContainer"><Loading /></div>}
        
    </div>
    </>
  )
}

export default MyListings