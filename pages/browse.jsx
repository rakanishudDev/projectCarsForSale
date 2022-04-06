import BrowseListings from "../components/comps/BrowseListings"
import Category from "../components/comps/Category"
import { db } from "../firebase.config"
import {getDocs, collection} from 'firebase/firestore'
import Search from "../components/layout/Search"
import {useState} from 'react'
import { searchWithCategory } from "../functions/searchFunctions"

export const getStaticProps = async () => {
  const listingRef = collection(db, 'transport')
    const querySnap = await getDocs(listingRef)
    let listings = []
    querySnap.forEach(doc => {
        return listings.push({
            id: doc.id,
            data: doc.data()
        })
    })
    const cars = JSON.stringify(listings)
    return {
      props: {
        cars
        
      }
    }
}

const Browse = ({cars}) => {
  const [searchPath, setSearchPath] = useState('')
  const [loading, setLoading] = useState(false)
  const [carsListings, setCarsListings] = useState(JSON.parse(cars))
  const changeSearchPath = (searchData) => {
    const {vehicleType, bodytype, make, fuel, transmission, drivetrain, year, offer } = searchData
    setSearchPath(`${make !== 'all' ? make : ''}${vehicleType !== 'all' ? '/' + vehicleType : ''}${bodytype !== 'all' ? '/' + bodytype : ''}${fuel !== 'all' ? '/' + fuel : ''}${transmission !== 'all' ? '/' + transmission : ''}${drivetrain !== 'all' ? '/' + drivetrain : ''}${year !== 'all' ? '/' + year : ''}${offer ? '/' + offer : ''}`)
  }
  const onSearch = async (searchData) => {
    setLoading(true)
    const {listings, loading} = await searchWithCategory(searchData)
    if (loading) {
      setLoading(true)
    }
    else {
      setCarsListings(listings)
      setLoading(false)
    }
    // setCarsListings( await searchWithCategory(searchData))

 }

  return (<>
    <br />
    <Search />
    
    

    <br />
    <div className="browse">
        
        <Category changeSearchPath={changeSearchPath} onSearch={onSearch} />

        <BrowseListings carsListings={carsListings} loading={loading} />
        
    </div>
    </>)
}

export default Browse