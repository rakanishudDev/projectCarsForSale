import React from 'react'
import styles from '../../styles/Loading.module.css'

const Loading = () => {
  return (
    <img className={styles.loader} alt="loading" src="/svg/loader.svg" />
  )
}

export default Loading