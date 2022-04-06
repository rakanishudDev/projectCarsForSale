import Profile from "../../components/comps/Profile"
import { withPrivate } from "../../hooks/routes"
import styles from '../../styles/Account.module.css'
import {getAuth} from 'firebase/auth'
import {useRouter} from 'next/router'
import MyListings from "../../components/comps/MyListings"



const Account = () => {
  const auth = getAuth()
  const router = useRouter()
  const signOut = () => {
    auth.signOut()
    router.push('/auth/sign-in')
  }
  return (
    <>
    
    <div className={styles.pageContainer}>
      
      <div>
   
      <br />
        <div className={styles.accountContainer}>
          <fieldset className={styles.profileFieldset}>
            <legend><h2 className={styles.heading}>Profile</h2></legend>
              
              {/* <button className={styles.signOut} onClick={signOut} >Sign Out</button> */}
            
            <Profile />
          </fieldset>
          <div className={styles.accountSettings}>
            <h2 style={{fontWeight: "500"}}>Account Settings</h2>
            <ul className={styles.settings}>
              <li>Change Account Email</li>
              <li>Change Password</li>
              <li style={{color: "red"}}>Delete Account</li>
              <li className={styles.signOut} onClick={signOut}>Sign Out</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
      <div className={styles.myListingsContainer}>

        
          
          <br />
          <div >
            <MyListings />
          </div>
          <br />
          <br />
          <br />
        
        
      </div>
      </div>
    </div>
    </>
  )
}

export default withPrivate(Account)