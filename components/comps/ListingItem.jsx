import styles from '../../styles/ListingItem.module.css'
import Link from 'next/link'
import { saveListing } from '../../functions/listingFunction'

const ListingItem = ({data, id, myPrivate, onEdit}) => {
    const save = () => {
        saveListing(id)
    }
  return (
    <div className={styles.itemContainer}>
        <h3 className={styles.smallScreenItemName}>{data.name}</h3>
        <div className={styles.contentContainer}>
            <div className={styles.imgDiv}>
                <Link className="link" href={"/listings/" + id}><img onClick={() => console.log(data)} className={styles.img} src={data.imgUrls[0]} alt="image" /></Link>
            </div>
            
            <div className={styles.itemDetails}>
                <Link href={"/listings/" + id}>
                    <a className={styles.itemNameLink}>
                        {data.offer && <div className={styles.offerBadge}><p className={styles.offerBadgeText}>Offer</p></div>}
                        <h2 className={styles.itemName}>{data.name}</h2>
                    </a></Link>
                <p className={styles.itemLocation}>{data.location}</p>
                {data.offer ? <p className={styles.itemPrice}>${data.discountedPrice}</p> :
                <p className={styles.itemPrice}>${data.regularPrice} </p>
                }

                <div className={styles.itemFacts}>
                    <p>{data.year} | {data.vehicleType} | {data.bodytype} | {data.fuel} | {data.transmission} | {data.drivetrain}</p>
                </div>
                
            </div>

            {myPrivate ? 
                <div className={styles.itemFavoriteDiv}>
                    <img onClick={() => onEdit(id)} className={styles.editIcon} alt="favorite" src="/svg/edit.svg" />
                    <img className={styles.deleteIcon} alt="favorite" src="/svg/delete.svg" />
                    
                </div> 
                : 
                <div className={styles.itemFavoriteDiv}>
                    <img onClick={save} className={styles.heartIcon} alt="favorite" src="/svg/heart.svg" />
                </div>}
            
        </div>
    </div>
  )
}

export default ListingItem