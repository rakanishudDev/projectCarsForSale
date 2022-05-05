import {useEffect, useState} from 'react'
import styles from '../../styles/Home.module.css'
import { getForumData } from '../../functions/forumFunctions'
import { correctDateTimeFormat } from '../../functions/listingFunction'
import Link from 'next/link'

const ForumTopics = () => {
    const [topics, setTopics] = useState(null)
    useEffect(() => {
        const fetchingData = async () => {
            const topics = await getForumData('remont-hooldus')
            topics.forumData.map(doc => {
                doc.data.date = correctDateTimeFormat(doc.data.date, true)
            })
            setTopics(topics.forumData)
            console.log(topics.forumData)
        }
        fetchingData()
    }, [])
  if (!topics) return <h1>waiting</h1>
  return (
    <div className={styles.rowContainer}>
        <div className={styles.forumTopics}>
        <div>
            <h3 className={styles.categoryHeader}>FORUM TEHNIKA</h3>
        </div>
        <div className={styles.topicsRow}>

            <div className={styles.topicCard}>
                <div className={styles.topicContent}>
                    <div className={styles.bottomBlueLine}></div>
                    <h3 className={styles.topicCardTitle}>{topics[3].data.title}</h3>
                    <div className={styles.postContainer}>
                        <p className={styles.topicPost}>{topics[3].data.post}</p>
                    </div>
                    <Link href={`/forum/tehnika/remont-hooldus/${topics[3].id}`}><a className={styles.viewMore}>View more . . .</a></Link>
                </div>
                <div>
                    <div className={styles.bottomInfo}>
                        <p><i>{topics[3].data.date}</i></p>
                    </div>
                    <div className={styles.bottomBlueLine}></div>
                </div>
            </div>

            <div className={styles.topicCard}>
                <div className={styles.topicContent}>
                    <div className={styles.bottomBlueLine}></div>
                    <h3 className={styles.topicCardTitle}>{topics[1].data.title}</h3>
                    <div className={styles.postContainer}>
                        <p className={styles.topicPost}>{topics[1].data.post}</p>
                    </div>
                    <Link href={`/forum/tehnika/remont-hooldus/${topics[1].id}`}><a className={styles.viewMore}>View more . . .</a></Link>
                </div>
                <div>
                    <div className={styles.bottomInfo}>
                        <p><i>{topics[1].data.date}</i></p>
                    </div>
                    <div className={styles.bottomBlueLine}></div>
                </div>
            </div>

            <div className={styles.topicCard}>
                <div className={styles.topicContent}>
                    <div className={styles.bottomBlueLine}></div>
                    <h3 className={styles.topicCardTitle}>{topics[0].data.title}</h3>
                    <div className={styles.postContainer}>
                        <p className={styles.topicPost}>{topics[0].data.post}</p>
                    </div>
                    <Link href={`/forum/tehnika/remont-hooldus/${topics[0].id}`}><a className={styles.viewMore}>View more . . .</a></Link>
                </div>
                <div>
                    <div className={styles.bottomInfo}>
                        <p><i>{topics[0].data.date}</i></p>
                    </div>
                    <div className={styles.bottomBlueLine}></div>
                </div>
            </div>

            <div className={styles.topicCard}>
                <div className={styles.topicContent}>
                    <div className={styles.bottomBlueLine}></div>
                    <h3 className={styles.topicCardTitle}>{topics[2].data.title}</h3>
                    <div className={styles.postContainer}>
                        <p className={styles.topicPost}>{topics[2].data.post}</p>
                    </div>
                    <Link href={`/forum/tehnika/remont-hooldus/${topics[2].id}`}><a className={styles.viewMore}>View more . . .</a></Link>
                </div>
                <div>
                    <div className={styles.bottomInfo}>
                        <p><i>{topics[2].data.date}</i></p>
                    </div>
                    <div className={styles.bottomBlueLine}></div>
                </div>
            </div>

        </div>
        <br />
    </div>
    </div>
  )
}

export default ForumTopics