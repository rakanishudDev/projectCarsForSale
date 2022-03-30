import ListingItem from "./ListingItem"
import Loading from "./Loading"

const BrowseListings = ({carsListings, loading}) => {
  console.log(carsListings)
  if (loading) {
    console.log('loading')
    return <div style={{width: "100%", textAlign: "center"}}><br /><Loading /></div>
  }
  return (
    
     <div className="listingItemsContainer">
       {carsListings.map(car => (
         <ListingItem key={car.id} id={car.id} data={car.data} />
       ))}
     </div>
    
  )
}

export default BrowseListings