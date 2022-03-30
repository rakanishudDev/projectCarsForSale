import React from 'react'
import styles from '../../styles/Footer.module.css'
const Footer = () => {
  return (
    <footer className={styles.footer}>
        <img className={styles.icon} src="/svg/cars.svg"/>
        <p><strong>Yawa</strong> <i>Copyright © 2022</i> All rights resrerved</p>
    </footer>
  )
}

export default Footer