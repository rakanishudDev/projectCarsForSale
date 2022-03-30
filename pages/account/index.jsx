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
    <div className={styles.pageContainer}>
      
      <div>
        
        <div className={styles.accountContainer}>
          <div>
            <div className={styles.headerContainer}>
              <h2>Profile</h2>
              {/* <button className={styles.signOut} onClick={signOut} >Sign Out</button> */}
            </div>
            <Profile />
          </div>
          <div className={styles.accountSettings}>
            <h3>Account Settings</h3>
            <ul className={styles.settings}>
              <li>Change Account Email</li>
              <li>Change Password</li>
              <li style={{color: "red"}}>Delete Account</li>
              <li className={styles.signOut} onClick={signOut}>Sign Out</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.myListingsContainer}>
        
          <h2>My Listings</h2>
          <br />
          <MyListings />
          <br />
          <br />
          <br />
        
        
      </div>

    </div>
  )
}

export default withPrivate(Account)