import styles from '../../styles/Navbar.module.css';
import Link from 'next/link'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useEffect, useRef, useState } from 'react';


const Navbar = () => {
  const auth = getAuth()
  const [userOnline, setUserOnline] = useState(null)
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, user => {
        if (user) {
          setUserOnline(true)
        } else {
          setUserOnline(false)
        }
      })
      return () => {
        isMounted.current = false
      }
    }

    console.log(auth.currentUser)
  }, [auth.currentUser])
  // if (userOnline === null) {
  //   return <div className={styles.Navbar}><p>. . .</p></div>
  // } 
  return (
    <>
    <div className={styles.navContainer}>
      <Link href="/">
      <header className={styles.headerContainer} >
        <img className={styles.icon} src="/svg/cars.svg"/>
        <h2 className={styles.header}>Yacars</h2>
      </header>
      </Link>
      
      <div className={styles.Navbar}>
        
        <Link href="/account/create-listings">
        <a className="sellButton-a"><button type="button" className="sellButton">Create a Listing</button></a>
        </Link>

          <nav>
              <ul className={styles.ul}>
                  <li><Link href="/"><a>Home</a></Link></li>
                  <li><Link href="/browse"><a>Browse</a></Link></li>

                  {userOnline ? <li><Link href="/account"><a>Account</a></Link></li> :
                  <li><Link href="/auth/sign-in"><a>Sign in</a></Link></li>}
              </ul>
          </nav>
      </div>
      
    </div>
    
    </>
  )
}

export default Navbar