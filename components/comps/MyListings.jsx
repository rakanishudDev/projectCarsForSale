import { useEffect, useState } from 'react'
import {getAuth} from 'firebase/auth'
import {getDocs, collection, query, where, orderBy, getDoc, doc} from 'firebase/firestore'
import ListingItem from './ListingItem'
import { db } from '../../firebase.config'
import {useRouter} from 'next/router'
import Loading from './Loading'
import styles from '../../styles/Account.module.css'



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
  
  return (<>
    <div className={styles.listingsButtons}>
        <div className={ toggle === 'listings' ? styles.listingsToggleOnDiv : styles.listingsToggleOffDiv}>
            <h2 onClick={() => setToggle('listings')} className={ toggle === 'listings' ? styles.listingsToggleOn : styles.listingsToggleOff}>My listings</h2>
        </div>
        <div className={ toggle === 'favorites' ? styles.listingsToggleOnDiv : styles.listingsToggleOffDiv}>
            <h2 onClick={() => setToggle('favorites')} className={ toggle === 'favorites' ? styles.listingsToggleOn : styles.listingsToggleOff}>Favorites</h2>
        </div>
        <div className={ toggle === 'history' ? styles.listingsToggleOnDiv : styles.listingsToggleOffDiv}>
            <h2 onClick={() => setToggle('history')} className={ toggle === 'history' ? styles.listingsToggleOn : styles.listingsToggleOff}>History</h2>
        </div>
    </div>
    
    <div className="listingItemsContainer">
        {
        !listings ?
            <div className="loadingContainer"><Loading /></div>
        :
        <>
            {toggle === 'listings' && listings.map(doc => {
                    return <ListingItem myPrivate={true} key={doc.id} id={doc.id} data={doc.data} onEdit={onEdit}  />
                    })}

            {toggle === 'favorites' && favorites.map(doc => {
                    return <ListingItem myPrivate={false} key={doc.id} id={doc.id} data={doc.data} onEdit={onEdit}  />
                    })}
        </>
        }

    </div>
    </>
  )
}

export default MyListings