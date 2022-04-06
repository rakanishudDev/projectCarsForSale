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

      {/* <Search /> */}
      <main className={styles.main}>
        
        
        <h3 className={styles.header}>POPULAR MAKES</h3>
        <div className={styles.popularMakes}>
          <h3 className={styles.popularMake}>Audi</h3>
          <h3 className={styles.popularMake}>BMW</h3>
          <h3 className={styles.popularMake}>Honda</h3>
          <h3 className={styles.popularMake}>Ford</h3>
          <h3 className={styles.popularMake}>Kia</h3>
          <h3 className={styles.popularMake}>Land Rover</h3>
          <h3 className={styles.popularMake}>Mazda</h3>
          <h3 className={styles.popularMake}>Mercedes-Benz</h3>
          <h3 className={styles.popularMake}>Wolkswagen</h3>
          <h3 className={styles.popularMake}>Volvo</h3>
        </div>

        {/* <div className={styles.pageNumbers}>
       
          <div className={styles.numbers}>
            <h3 className={styles.nr}>26</h3>
            <p className={styles.nrInfo}>Products</p>
          </div>
          <div className={styles.numbers}>
            <h3 className={styles.nr}>41</h3>
            <p className={styles.nrInfo}>All time</p>
            <p className={styles.nrInfo}>visits</p>
          </div>
        </div> */}

        <Reccomended />
        <SpecialOffer />
        <New />
      </main>

      
    </div>
  )
}
