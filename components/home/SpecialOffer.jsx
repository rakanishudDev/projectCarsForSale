import {useEffect, useState} from 'react'
import {getDocs, collection, query, where, orderBy, limit} from 'firebase/firestore'
import { db } from "../../firebase.config"
import styles from '../../styles/Home.module.css'
import Loading from '../comps/Loading'
import {useRouter} from 'next/router'

const SpecialOffer = () => {
    const [listings, setListings] = useState(null);
    const router = useRouter()
    const onClick = (id) => {
        router.push("/listings/" + id)
    }
    useEffect(() => {
        let array = []
        const fetchListings = async () => {
            const listingsRef = collection(db, 'transport')
            const q = query(listingsRef, where('offer', '==', true), limit(5))
            const listingsSnap = await getDocs(q);
            if (listingsSnap) {
                console.log(listingsSnap)
                listingsSnap.forEach(doc => {
                    array.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setListings(array)
            }
            
        }
        fetchListings()
            console.log('hey')
    }, [])
  return (
    <div>
            <h3 className={styles.categoryHeader}>Special Offers</h3>
            <div className={styles.row}>
                {listings ? listings.map((doc) => {

                        return <div onClick={() => onClick(doc.id)} key={doc.id} className={styles.listingContainer}>
                                    <div style={{background: `url(${doc.data.imgUrls[0]}) center no-repeat`, backgroundSize: "cover"}} key={doc.id}className={styles.imgDiv}>

                                    </div>
                                    <div className={styles.bottomBlueLine}>
                                    </div>
                                    <div className={styles.imgDetails}>
                                        <p className={styles.imageInfo}>{doc.data.make}</p>
                                        <p className={styles.imageInfo}>{doc.data.year}</p>
                                    </div>

                                    <div className={styles.priceDiv}>
                                        <p className={styles.imagePrice}>${doc.data.discountedPrice}</p>
                                        <p className={styles.discount}><i>Discount</i> <span className={styles.price}>${doc.data.regularPrice - doc.data.discountedPrice}</span></p>
                                    </div>
                                    <div className={styles.bottomBlueLine}>
                                    </div>
                                </div>
                }) : <Loading />}
            </div>
        </div> 
  )
}

export default SpecialOffer