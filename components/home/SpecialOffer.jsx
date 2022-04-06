import {useEffect, useState, useRef} from 'react'
import {getDocs, collection, query, where, orderBy, limit} from 'firebase/firestore'
import { db } from "../../firebase.config"
import styles from '../../styles/Home.module.css'
import Loading from '../comps/Loading'
import {useRouter} from 'next/router'
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";

const SpecialOffer = () => {
    const prevButtonRef = useRef(null)
    const nextButtonRef = useRef(null)
    const [swiper, setSwiper] = useState()
    const [listings, setListings] = useState(null);
    const router = useRouter()
    const onClick = (id) => {
        router.push("/listings/" + id)
    }
    useEffect(() => {
        let array = []
        const fetchListings = async () => {
            const listingsRef = collection(db, 'transport')
            const q = query(listingsRef, where('offer', '==', true), limit(10))
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

    useEffect(() => {
        if (swiper) {
            swiper.params.navigation.prevEl = prevButtonRef.current
            swiper.params.navigation.nextEl = nextButtonRef.current
            swiper.navigation.init()
            swiper.navigation.update()
        }
    }, [swiper])

  return (
    <div>
            <h3 className={styles.categoryHeader}>SPECIAL OFFERS</h3>

            { listings ? <div className={styles.customDiv}>
                <div ref={prevButtonRef} id="prev1" className={styles.buttonPrev}>
                    <img className={styles.leftArrow} src="/svg/keyboardArrowRightIcon.svg" alt="arrow" />
                </div>
                <Swiper
                    className={styles.rowSwiper}
                    modules={[Navigation]}
                    slidesPerView={5}
                    spaceBetween={16}
                    loop
                    speed={200}
                    navigation={{
                        prevEl: prevButtonRef?.current,
                        nextEl: nextButtonRef?.current
                    }}
                    onSwiper={setSwiper}
                >
                {listings.map((doc) => {
                        return <SwiperSlide key={doc.id}>
                                <div onClick={() => onClick(doc.id)} key={doc.id} className={styles.listingContainer}>
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
                                </SwiperSlide>
                })}
                </Swiper>
                <div ref={nextButtonRef} id="next1" className={styles.buttonNext}>
                    <img className={styles.rightArrow} src="/svg/keyboardArrowRightIcon.svg" alt="arrow" />
                </div>
            </div> : <div className="loadingContainer"><Loading /></div>}
        </div>
  )
}

export default SpecialOffer