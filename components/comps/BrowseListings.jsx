import ListingItem from "./ListingItem"
import Loading from "./Loading"
import styles from '../../styles/Browse.module.css'

const BrowseListings = ({carsListings, loading}) => {
  if (loading) {
    console.log('loading')
    return <div style={{width: "1200px", textAlign: "center"}}><br /><Loading /></div>
  }
  return (
     <div className="listingItemsContainer">
      <div className={styles.sort}><p>&darr; POPULARIY </p> | <p>PRICE </p>|<p> NAME </p>|<p>DATE</p></div>
       {carsListings.map(car => (
         <ListingItem key={car.id} id={car.id} data={car.data} />
       ))}
     </div>

  )
}

export default BrowseListings