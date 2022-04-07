import Link from 'next/link'
import styles from '../../styles/Footer.module.css'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'

const Footer = () => {
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
  return (
    <footer className={styles.footer}>
       
        <div>
        <ul className={styles.ul}>
                  <li><Link href="/"><a>Home</a></Link></li>
                  <li><Link href="/browse"><a>Browse</a></Link></li>

                  {userOnline ? <li><Link href="/account"><a>Account</a></Link></li> :
                  <li><Link href="/auth/sign-in"><a>Sign in</a></Link></li>}
              </ul>
        </div>
        <br />
        <img className={styles.icon} src="/svg/cars.svg"/>
        <p><strong>Yawa</strong> <i>Copyright © 2022</i> All rights resrerved</p>
    </footer>
  )
}

export default Footer