import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Search from '../components/layout/Search'
import Reccomended from '../components/home/Reccomended'
import New from '../components/home/New'
import SpecialOffer from '../components/home/SpecialOffer'
export default function Home() {
  return (
    <div className={styles.container}>
      <br />
    <div className="blueRowSmall"></div>
      <Search />
      <main className={styles.main}>
        <Reccomended />
        <SpecialOffer />
        <New />
      </main>

      
    </div>
  )
}
