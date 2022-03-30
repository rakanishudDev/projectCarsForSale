import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {addDoc, collection, serverTimestamp, doc, updateDoc} from 'firebase/firestore';
import {v4 as uuidv4} from 'uuid';
import { db } from '../firebase.config';
import {toast} from 'react-toastify';


// Create a Listing ==>
export const createListing = async (formData) => {
  const auth = getAuth()
  let error = false
  let ok = false
    const {name,
        vehicleType,
        bodytype,
        model,
        make,
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
        regularPrice, 
        discountedPrice,
        images,
      } = formData
    
      if(discountedPrice > regularPrice) {
        error = true
        toast.error('Discounted Price needs to be less than Regular Price');
        return
      }
      if (images.length > 6) {
        error = true
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
          return storeImage(img)
        })
      ).catch(err => {
        console.log(err)
        toast.error('Images Not Uploaded!');
        error = true
      });

      const formDataCopy = {...formData, imgUrls, timestamp: serverTimestamp()}
      delete formDataCopy.images;
      !formDataCopy.offer && delete formDataCopy.discountedPrice;

      const docRef = await addDoc(collection(db, 'listings'), formDataCopy).catch(err => error = true)
      const docRef2 = await addDoc(collection(db, 'transport'), formDataCopy).catch(err => error = true)

      toast.success('Listing saved!')
      //setLoading(false);
      ok = true
      } catch(err) {
        console.log(err)
        error = true
      }

  return {ok, error}
}


// UPDATE LISTING ==>
export const updateListing = async (formData, slug, changeImgs) => {
  const auth = getAuth()
  let error = false
  let ok = false
    const {name,
        vehicleType,
        bodytype,
        model,
        make,
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
        regularPrice, 
        discountedPrice,
        images,
      } = formData
    
      if(discountedPrice > regularPrice) {
        error = true
        toast.error('Discounted Price needs to be less than Regular Price');
        return
      }if (changeImgs) {
        if (images.length > 6) {
          error = true
          toast.error('Max 6 images');
          return
        }
      }
      
      //store images
      let imgUrls = []
      let formDataCopy = {}
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
                  resolve(downloadURL);
                });
              }
            );
  
  
          })
        } // storeImage() end
        imgUrls = await Promise.all(
          [...images].map(img => {
            return storeImage(img)
          })
        ).catch(err => {
          console.log(err)
          toast.error('Images Not Uploaded!');
          error = true
        });
        formDataCopy = {imgUrls}
      } // if () end
      
      try {
      
      formDataCopy = {...formData, timestamp: serverTimestamp()}
      delete formDataCopy.images;
      !formDataCopy.offer && delete formDataCopy.discountedPrice;

      const docRef = doc(db, 'transport', slug);
      await updateDoc(docRef, formDataCopy).catch(err => error = true)

      toast.success('Listing saved!')
      ok = true
      } catch(err) {
        console.log(err)
        error = true
      }



  return {ok, error}
}
