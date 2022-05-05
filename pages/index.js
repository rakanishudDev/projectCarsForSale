import Head from 'next/head'
import styles from '../styles/Home.module.css'
import New from '../components/home/New'
import SpecialOffer from '../components/home/SpecialOffer'
import ForumTopics from '../components/home/ForumTopics'



export default function Home() {

  return (
    <div className={styles.container}>

      {/* <Search /> */}
      <main className={styles.main}>
        
        
        {/* <h3 className={styles.header}>POPULAR MAKES</h3> */}
        <h3 className={styles.header}>EXPLORE AND FIND YOUR DREAM CAR</h3>
        <br />
        {/* <div>
          <h3 className={styles.carsForSaleCount}>Currently <span className={styles.carsForSaleCountNumber}>36</span> cars for sale</h3>
        </div> */}
        <div className={styles.popularMakes}>
          <h3 className={styles.popularMake}>Audi</h3>
          <h3 className={styles.popularMake}>BMW</h3>
          <h3 className={styles.popularMake}>Honda</h3>
          <h3 className={styles.popularMake}>Ford</h3>
          <h3 className={styles.popularMake}>Kia</h3>
          <h3 className={styles.popularMake}>Land Rover</h3>
          <h3 className={styles.popularMake}>Mazda</h3>
          <h3 className={styles.popularMake}>Mercedes-Benz</h3>
          <h3 className={styles.popularMake}>Volkswagen</h3>
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

        {/* <Reccomended /> */}
        <SpecialOffer />
        <New />
        <br />
        <ForumTopics />

      </main>

      
    </div>
  )
}
