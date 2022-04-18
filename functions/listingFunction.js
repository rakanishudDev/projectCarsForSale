import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {addDoc, collection, serverTimestamp, doc, updateDoc, getDoc} from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';
import { db } from '../firebase.config';
import {toast} from 'react-toastify';


export const correctDateTimeFormat = (dt, t) => {

  let dateTime = dt.toDate()
  dateTime = dateTime.toLocaleDateString() + ' ' + dateTime.toTimeString()
  const [date, time] = dateTime.split(' ')
  const [hours, minutes] = time.split(':')
  console.log(dateTime)
  if (t) {
    return date + ' ' + hours + ':' + minutes
  } else {
    return date
  }
  
}

export const makePath = (slug, id) => {
  let a = slug;
  let b = id
  switch(slug) {
      case 'tehnika':
           a = 'Tehnika'
           switch(id) {
              case 'remont-hooldus':
                   b = 'Remont ja hooldus'
                   break;
              case 'tehnoülevaatus':
                   b = 'Tehnoülevaatus'
                   break;
              case 'varuosad':
                   b = 'Varuosad'
                   break;
              default:
                  break;
           }
          break;
      case 'tuunimine':
           a = 'Sõidukite modifitseerimine ja tuunimine'
           switch(id) {
              case 'audio':
                   b = 'Audio'
                   break;
              case 'auto-välimuse-muutmine':
                   b = 'Auto välimuse muutmine'
                   break;
              case 'mootori-tuunimine':
                   b = 'Mootori tuunimine'
                   break;
              case 'veljed-rehvid':
                   b = 'Veljed ja rehvid'
                   break;
              case 'muu':
                   b = 'Muud vidinad'
                   break;
              default:
                  break;
           }
          break;
      case 'mototehnika':
           a = 'Mototehnika'
           switch(id) {
              case 'ATV':
                   b = "ATV'd"
                   break;
              case 'bike':
                   b = "Bike'd"
                   break;
              case 'chopperid':
                   b = 'Chopperid'
                   break;
              case 'mootorrattad':
                   b = 'Mootorrattad'
                   break;
              case 'mootorsaanid':
                   b = 'Mootorsaanid'
                   break;
              case 'rollerid':
                   b = 'Rollerid'
                   break;
              default:
                  break;
           }
          break;
      case 'teised-sõidukid':
           a = 'Teised sõidukid'
           switch(id) {
              case 'bussid-kaubikud':
                   b = 'Bussid, väikebussid ja kaubikud'
                   break;
              case 'haagissuvilad':
                   b = 'Haagissuvilad'
                   break;
              case 'maasturid':
                   b = 'Maasturid'
                   break;
              case 'veesõidukid':
                   b = 'Veesõidukid'
                   break;
              case 'veoautod-rasketehnika':
                   b = 'Veoautod ja rasketehnika'
                   break;
              default:
                  break;
           }
          break;
      case 'muud-foorumid':
           a = 'Muud foorumid'
           switch(id) {
              case 'autondus':
                   b = 'Autondus'
                   break;
              case 'kindlustus':
                   b = 'Kindlustus'
                   break;
              case 'liiklus':
                   b = 'Liiklus'
                   break;
              case 'õppesõit-autokoolid':
                   b = 'Õppesõit ja autokoolid'
                   break;
              case 'ostuabi':
                   b = 'Ostuabi'
                   break;
              case 'finantseerimine':
                   b = 'Sõiduki ostu finantseerimine'
                   break;
              case 'vaba-teema':
                   b = 'Vaba teema'
                   break;
              case 'võistlustanner':
                   b = 'Võistlustanner ehk autode võrdlus'
                   break;
              case 'üritused':
                   b = 'Üritused'
                   break;
              
              default:
                  break;
           }
          break;
      case 'auto-sport':
           a = 'Auto sport'
           switch(id) {
              case 'eesti-autosport':
                   b = 'Eesti autosport'
                   break;
              case 'vormel1':
                   b = 'Vormel 1'
                   break;
              case 'WRC':
                   b = 'WRC'
                   break;
              default:
                  break;
           }
          break;

      default:
          break;
  }


  return a + ' » ' + b

}




// Create a Listing ==>
export const createListing = async (formData) => {
  

  const auth = getAuth()
  let error = false
  let ok = false
    const {name,
        vehicleType,
        bodytype,
        model,
        year, 
        power,
        engine,
        colorName,
        mileage, 
        fuel, 
        transmission,
        drivetrain,
        location,
        color,
        description,
        offer, 
        images
      } = formData
      const regularPrice = parseInt(formData.regularPrice);
      const discountedPrice = parseInt(formData.discountedPrice);
      const make = formData.make.toUpperCase()
      if(discountedPrice > regularPrice) {
        ok = false
        toast.error('Discounted Price needs to be less than Regular Price');
        return
      }
      if (images.length > 6) {
        ok = false
        toast.error('Max 6 images');
        return
      }

      //store images
      const storeImage = async (image) => {
        return new Promise((resolve,reject) => {
          const storage = getStorage();
          const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
          const storageRef = ref(storage, 'images/' + fileName);
          const uploadTask = uploadBytesResumable(storageRef, image)

          uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
                default:
                  break;
              }
            }, 
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              reject(error)
            }, 
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL)
                resolve(downloadURL);
              });
            }
          );


        })
      }
      try {
      const imgUrls = await Promise.all(
        [...images].map(img => {
          return storeImage(img.url)
        })
      ).catch(err => {
        console.log(err)
        toast.error('Images Not Uploaded!');
        ok = false
      });
      
      const formDataCopy = {...formData, imgUrls, timestamp: serverTimestamp()}
      formDataCopy.make = make
      formDataCopy.regularPrice = regularPrice
      delete formDataCopy.images;
      formDataCopy.discountedPrice = discountedPrice;
      !formDataCopy.offer && delete formDataCopy.discountedPrice;

      const docRef = await addDoc(collection(db, 'listings'), formDataCopy).catch(err => ok = false)
      const docRef2 = await addDoc(collection(db, 'transport'), formDataCopy).catch(err => ok = false)
      const productRef = doc(db, 'numbers', 'products');
      const productsSnap = await getDoc(productRef, {userRef: formData.userRef});
      const productsCount = productsSnap.data()
      console.log(productsCount)
      await updateDoc(productRef, {
        products: productsCount.products + 1
      })
      toast.success('Listing saved!')
      //setLoading(false);
      ok = true
      } catch(err) {
        console.log(err)
        ok = false
      }

  return {ok}
}





// UPDATE LISTING ==>
export const updateListing = async (formData, slug, changeImgs, imageUrls) => {
  if (imageUrls.length <= 0) {
    toast.error('No images selected')
    return {ok: false}
}
  const auth = getAuth()
  let error = false
  let ok = false
    const {name,
        vehicleType,
        bodytype,
        model,
        year, 
        power,
        engine,
        colorName,
        mileage, 
        fuel, 
        transmission,
        drivetrain,
        location,
        color,
        description,
        offer, 
        images,
      } = formData
      const regularPrice = parseInt(formData.regularPrice);
      const discountedPrice = parseInt(formData.discountedPrice);
      const make = formData.make.toUpperCase()
      if(discountedPrice > regularPrice) {
        ok = false
        toast.error('Discounted Price needs to be less than Regular Price');
        return
      }if (changeImgs) {
        if (images.length > 6) {
          ok = false
          toast.error('Max 6 images');
          return
        }
      }
      
      //store images
      const iUrls = [];
      let imgsUrls = [];
      imageUrls.map(img => {
        return imgsUrls.push(img.url)
      })
      let formDataCopy = {};
      if (changeImgs) {
        const storeImage = async (image) => {
          return new Promise((resolve,reject) => {
            const storage = getStorage();
            const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
            const storageRef = ref(storage, 'images/' + fileName);
            const uploadTask = uploadBytesResumable(storageRef, image)
  
            uploadTask.on('state_changed',
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                  default:
                    break;
                }
              }, 
              (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                reject(error)
              }, 
              () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log(downloadURL)
                  imgsUrls.push(downloadURL)
                  resolve(downloadURL);
                });
              }
            );
  
  
          })
        } // storeImage() end
        
        await Promise.all([...images].map(img => {
          return storeImage(img.url)
        })).then(async (value) => {
          try {
            const imgUrls = [...imgsUrls]
            formDataCopy = {...formData, imgUrls, timestamp: serverTimestamp()}
            
            formDataCopy.regularPrice = regularPrice
            formDataCopy.discountedPrice = discountedPrice
            formDataCopy.make = make
            delete formDataCopy.images;
            !formDataCopy.offer && delete formDataCopy.discountedPrice;
      
            const docRef = doc(db, 'transport', slug);
            await updateDoc(docRef, formDataCopy).catch(err => ok = false)
      
            toast.success('Listing saved!')
            ok = true
            } catch(err) {
              console.log(err)
              toast.error('Something went wrong. Could not update a listing');
              ok = false
            }

          
          
        }).catch(err => {
          console.log(err)
          toast.error('Images Not Uploaded!');
          ok = false
        });
        
     
      } // if () end
      else {
        try {
          const imgUrls = [...imgsUrls]
          formDataCopy = {...formData, imgUrls, timestamp: serverTimestamp()}
          
          formDataCopy.regularPrice = regularPrice
          formDataCopy.discountedPrice = discountedPrice
          formDataCopy.make = make
          delete formDataCopy.images;
          !formDataCopy.offer && delete formDataCopy.discountedPrice;

          const docRef = doc(db, 'transport', slug);
          await updateDoc(docRef, formDataCopy).catch(err => error = true)

          toast.success('Listing saved!')
          ok = true
          } catch(err) {
            console.log(err)
            toast.error('Something went wrong. Could not update a listing');
            ok = false
          }

      }
  return {ok}
}




// Save Listings ==>
export const saveListing = async (docId) => {
  const auth = getAuth()
  let redirect = false
  console.log(auth._currentUser )
  if (auth._currentUser == null) {
    redirect = true
    return redirect
  }
  const listingRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(listingRef);
  let ok = true
  const favorites = docSnap.data().favorites;
  favorites.map(listing => {
    if (listing === docId) {
      return ok = false
    }
  })
  if (ok) {
    favorites.unshift(docId)
    await updateDoc(listingRef, {
      favorites
    })
    toast.info('Listing saved')
    redirect = false
    return redirect
  } else {
    toast.warning('Listing is already saved');
    redirect = false
    return redirect
  }

}



