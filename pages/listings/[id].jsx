import {getDocs, collection, getDoc, doc} from 'firebase/firestore'
import { db } from '../../firebase.config'
import {useState, useRef, useEffect} from 'react'
import styles from '../../styles/ListingPage.module.css'

export async function getStaticPaths() {
    const listingRef = collection(db, 'transport')
    const listingSnap = await getDocs(listingRef)
    let paths = []
    if (listingSnap) {
        listingSnap.forEach(doc => {
            return paths.push({
                params: {
                    id: doc.id
                }
            })
        })
        
    } 
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const listingRef = doc(db, 'transport', params.id)
    const listingSnap = await getDoc(listingRef)
    let data = null
    if (listingSnap.exists()) {
        data = {
            id: listingSnap.id,
            data: listingSnap.data()
        }
    } else {
        data= {
            error: 'Could Not Fetch Data'
        }
    }
    const listing = JSON.stringify(data)
    let owner = {}
    const userRef = doc(db, 'users', data.data.userRef)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
        owner = userSnap.data()
    }
    owner = JSON.stringify(owner)
    return {
        props: {
            listing,
            owner
        },
        revalidate: 60
    }
}

const ListingPage = ({listing, owner}) => {
    const [data, setData] = useState(JSON.parse(listing))
    const [user, setUser] = useState(JSON.parse(owner))
    const [copied, setCopied] = useState(false)
    const textarea = useRef()
    let discount = null
    if (data.data.offer) {
        discount = data.data.regularPrice - data.data.discountedPrice
    }
    const time = new Date(data.data.timestamp.seconds * 1000).toLocaleDateString() + ' at ' + new Date(data.data.timestamp.seconds).toLocaleTimeString()
    useEffect(() => {
        textarea.current.style.height = 10 + textarea.current.scrollHeight + 'px';
        textarea.current.oninput = function() {
            textarea.current.style.height = 10 + textarea.current.scrollHeight + 'px';
        }
    }, [textarea])
  return (
      <>
      <br />
      <div className={styles.pageContainer}>
          <br />
          <div className={styles.nameContainer}>
            <h1 className={styles.name}>
                {data.data.name}
                <img onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false)
                    }, 2000)
                }} className={styles.shareIcon} src="/svg/shareIcon.svg" alt="share icon"/>
                {copied && <span className={styles.copyText}><i>Link Copied</i></span>}
            </h1>
            
          </div>
          <p className={styles.location}>{data.data.location}</p>
          <div className={styles.priceContainer}>
            <p className={styles.price}>${data.data.regularPrice}</p>
            {discount && (<>
                <p className={styles.discount}>{discount && 'Offer'}</p>
                <p className={styles.discount}>{discount && '$' + discount + ' discount'}</p>
                </>)
                }
          </div>
        <div className={styles.contentContainer}>
            <div className={styles.details}>
                
                
                <table className={styles.table}>
                    <tbody className={styles.tbody}>
                        <tr>
                            <td className={styles.tableIndex}>Make</td>
                            <td className={styles.tableValue}>{data.data.make}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Vehicle Type</td>
                            <td className={styles.tableValue}>{data.data.vehicleType}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Bodytype</td>
                            <td className={styles.tableValue}>{data.data.bodytype}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Model</td>
                            <td className={styles.tableValue}>{data.data.model}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Engine</td>
                            <td className={styles.tableValue}>{data.data.engine}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Power</td>
                            <td className={styles.tableValue}>{data.data.power} kW</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Fuel</td>
                            <td className={styles.tableValue}>{data.data.fuel}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Transmisson</td>
                            <td className={styles.tableValue}>{data.data.transmission}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Drivetrain</td>
                            <td className={styles.tableValue}>{data.data.drivetrain}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Color</td>
                            <td className={styles.tableValue}>{data.data.color}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Mileage</td>
                            <td className={styles.tableValue}>{data.data.mileage} km</td>
                        </tr>
                        <tr>
                            <td className={styles.tableIndex}>Year</td>
                            <td className={styles.tableValue}>{data.data.year}</td>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.description}>
                    <textarea disabled defaultValue={data.data.description} ref={textarea} className={styles.descriptionTextarea} />

                </div>
                <br />
                <fieldset className={styles.contactFieldset}>
                    <legend>
                        <h3 className={styles.contactHeader}>Contact</h3>
                    </legend>
                    <br />
                    <div className={styles.contact}>
                        <div className={styles.contactRow}>
                            <img src="/svg/user.svg" alt="user" />
                            <p>{user.name && user.name}</p>
                        </div>
                        <div className={styles.contactRow}>
                            <img src="/svg/phone.svg" alt="phone" />
                            <p>{data.data.number && data.data.number}</p>
                        </div>
                        <div className={styles.contactRow}>
                            <img src="/svg/email.svg" alt="email" />
                            <a href="#">{user.email}</a>
                        </div>
                    </div>
                </fieldset>
                <div className={styles.time}><p>{time}</p></div>
            </div>
            <div className={styles.imgContainer}>
                {data.data.imgUrls.map(img => {
                return <img key={img} className={styles.img} src={img} alt="Image" />
                }) }
            </div>
            
        </div>
        <br />
    </div>
    </>
  )
}

export default ListingPage