import {useEffect, useState, useRef} from 'react'
import {getDocs, collection, query, where, limit, orderBy} from 'firebase/firestore'
import { db } from "../../firebase.config"
import styles from '../../styles/Home.module.css'
import Loading from '../comps/Loading'
import {useRouter} from 'next/router'

const New = () => {

    const [listings, setListings] = useState(null);
    const [hover, setHover] = useState(false)
    const router = useRouter()
    const onClick = (id) => {
        router.push("/listings/" + id)
    }
    useEffect(() => {
        let array = []
        const fetchListings = async () => {
            const listingsRef = collection(db, 'transport')
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(15))
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

    }, [])

 if (listings) return (
    <div >
            <h3 className={styles.categoryHeader}>NEW</h3>
            <div style={{display: "flex", flexDirection: "center"}}>
            <div style={{margin: "0 59px"}} className={styles.newGrid}>
                {listings && listings.map((doc) => {

                    return <div onMouseOver={() => setHover(doc.id)} onMouseOut={() => setHover(false)} onClick={() => onClick(doc.id)} key={doc.id} className={styles.listingContainer}>
                            <div className={styles.imgParentDiv}>
                            <div style={{background: `url(${doc.data.imgUrls[0]}) center no-repeat`, backgroundSize: "cover"}} key={doc.id}className={ hover !== doc.id ? styles.imgDiv : styles.imgDivZoom}>
                            </div>
                            </div>
                            <div className={styles.imgDetails}>
                                <p className={styles.imageInfo}>{doc.data.make}</p>
                                <p className={styles.imageInfo}>{doc.data.year}</p>
                            </div>
                                <p className={styles.imagePrice}>${doc.data.regularPrice}</p>
                            <div  className={styles.bottomBlueLine}>
                            </div>
                        </div>
                    })}
            </div>
            </div>
      </div>
  )
  return <div></div>
}

export default New