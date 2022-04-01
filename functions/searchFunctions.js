import {getDocs, collection, query, where, orderBy, limit, startAfter} from 'firebase/firestore';
import { db } from '../firebase.config';
import {toast} from 'react-toastify';

export const searchWithCategory = async (searchData) => {
let loading = true
const { 
    vehicleType,
    bodytype,
    make,
    fuel,
    transmission,
    drivetrain,
    year,
    startPrice,
    endPrice,
    offer
    } = searchData;

    const startingPrice = parseInt(startPrice || 0)
    const endingPrice = parseInt(endPrice || 1000000)

    console.log(startingPrice + ' yayy')
    console.log(endingPrice + ' yayy')
    const listings = []
    try {
    const listingRef = collection(db, 'transport')
    
    const whereArray = []
    const startWhere = where('regularPrice', ">=", startingPrice)
    whereArray.push(startWhere)
    const endWhere = where('regularPrice', "<=", endingPrice)
    whereArray.push(endWhere)

    if (vehicleType !== 'all') {
        const q = where('vehicleType', '==', vehicleType)
        whereArray.push(q)
    }
    if (bodytype !== 'all') {
        const q = where('bodytype', '==', bodytype)
        whereArray.push(q)
    }
    if (make !== 'all') {
        const q = where('make', '==', make)
        whereArray.push(q)
    }
    if (fuel !== 'all') {
        const q = where('fuel', '==', fuel)
        whereArray.push(q)
    }
    if (transmission !== 'all') {
        const q = where('transmission', '==', transmission)
        whereArray.push(q)
    }
    if (drivetrain !== 'all') {
        const q = where('drivetrain', '==', drivetrain)
        whereArray.push(q)
    }
    if (year !== 'all') {
        const q = where('year', '==', year)
        whereArray.push(q)
    }
    if (offer !== false) {
        const q = where('offer', '==', true)
        whereArray.push(q)
    }
    console.log(whereArray)
    
    const q = query(listingRef, ...whereArray, orderBy('regularPrice'), orderBy('timestamp', 'desc'), limit(15))
    // const qq = query(listingRef, where('regularPrice', ">", startingPrice), limit(15))
    const querySnap = await getDocs(q)
    if (querySnap) {
        querySnap.forEach(doc => {
            return listings.push({
                id: doc.id,
                data: doc.data()
            })
        })
    }
    loading = false

    } catch(err) {
      console.log(err);
      toast.error('Something Went Wrong') 
      loading = false
    }
    console.log(listings)
    return {listings, loading}
}