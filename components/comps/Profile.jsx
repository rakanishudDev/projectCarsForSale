
import {getAuth, updateProfile} from 'firebase/auth'
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import {useState, useEffect} from 'react'
import { db } from '../../firebase.config'
import styles from '../../styles/Profile.module.css'
import {toast} from 'react-toastify'

const Profile = () => {
    const auth = getAuth()
    const [user, setUser] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        location: '',
        username: '',
        favorites: []
      });
    const {email, name, location, username} = user
    const [changeDetails, setChangeDetails] = useState(false)
    const [locationVar, setLocationVar] = useState('')

    const onChange = (e) => {
        setUser((prevState) => ({...prevState, [e.target.id]: e.target.value}));
      }

    const onChangeDetails = async () => {
        console.log(locationVar)
        if (changeDetails) {
            try {
              if(auth.currentUser.displayName !== name) {
                 //update in firebase
                await updateProfile(auth.currentUser, {
                displayName: name
                } )
                //update in database
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                  name
                })
              }
    
              if(locationVar !== location) {
                //update in database
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                  location
                })
              }
             
            } catch (error) {
              toast.error('Could not update profile details')
              console.log(error)
            }
        }
        setChangeDetails(!changeDetails)
    }
    useEffect(() => {
        const fetchUser = async () => {
          const docRef = doc(db, 'users', auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists() ) {
            setUser(prevState => {
              setLocationVar(docSnap.data().location)
              return {...prevState, username: docSnap.data().username ? docSnap.data().username : docSnap.data().email, location: docSnap.data().location}
            })
          }
        }
       
        fetchUser()
      }, [auth.currentUser.uid])
  return (
    <div className={styles.profileContainer}>
        
        <div className={styles.profileCard}>
          <div className={styles.avatrDiv}>         
            <img className={styles.profileAvatar} src="/images/Profile_avatar.png" alt="Avatar" />
          </div>
          <div>
            <p className={styles.profileUsername}>{username ? username : 'loading...'}</p>
          <table className={styles.profileDetailsTable} >
          
          <tbody>
            <tr>
              <td style={{height: "16px"}} className={styles.inputLabel}>Email</td>
              <td >
                <input autoComplete="off" required disabled type="email" id="email" className={changeDetails ? styles.profileDetailsInputActive : styles.profileDetailsInput} placeholder="Email" value={email} onChange={onChange}/>
              </td>
            </tr>
            <tr>
              <td style={{height: "16px"}} className={styles.inputLabel}>Name</td>
              <td>
                <input autoComplete="off" required disabled={!changeDetails} type="name" id="name" className={changeDetails ? styles.profileDetailsInputActive : styles.profileDetailsInput} placeholder="Name" value={name} onChange={onChange}/>
              </td>
            </tr>
            <tr>
              <td  className={styles.inputLabel}>Location</td>
              <td >
                <input autoComplete="off" required disabled={!changeDetails} type="location" id="location"  className={changeDetails ? styles.profileDetailsInputActive : styles.profileDetailsInput} placeholder="Location" value={location} onChange={onChange}/>
              </td>
            </tr>
            </tbody>
          </table>
          <br/>
            <button onClick={onChangeDetails} type="button" className={styles.changeSave}>{changeDetails ? 'Save' : 'Change'}</button>
          </div>
          

        </div>
      </div>
  )
}

export default Profile