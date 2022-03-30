import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Search from '../components/layout/Search'
export default function Home() {
  return (
    <div className={styles.container}>
      <Search />
      <main className={styles.main}>
        
      </main>

      
    </div>
  )
}
