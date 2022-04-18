import React from 'react'
import styles from '../../../../styles/Forum.module.css'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import { getForumData } from '../../../../functions/forumFunctions'
import {useRouter} from 'next/router'
import { correctDateTimeFormat, makePath } from '../../../../functions/listingFunction'





const ForumCategory = () => {
    const router = useRouter();
    const {slug, id, tid} = router.query
    const path = makePath(slug, id)
    console.log(path)
    const [forumData, setForumData] = useState([])
    useEffect(() => {
        const gettingForumData = async () => {
            const data = await getForumData(id)
            data.map(doc => {
                 doc.data.date = correctDateTimeFormat(doc.data.date, true)
                 doc.data.lastPosted = correctDateTimeFormat(doc.data.lastPosted, true)
                 return
            })
        setForumData(data)
        console.log(data)
        }
        if(id) {
          gettingForumData()
        }
        
      
    }, [id])
  return (
    <div className={styles.pageContainer}>
        <div>
            <table cellPadding="8" cellSpacing="0" className={styles.table}>
                <tbody className={styles.tbody}>
                    <tr>
                        <th className={styles.th}>Forum</th>
                        <th className={styles.thDetails}>Author</th>
                        <th className={styles.thDetails}>Replies</th>
                        <th className={styles.thDetailsLast}><span>Last posted</span></th>
                    </tr>
                    <tr>
                        <td className={styles.topicsCategory} colSpan="4">{path}</td>
                       
                    </tr>
                       
                        {forumData && forumData.map(doc => {
                            return <tr key={doc.id} className={styles.tableRow}>
                            <td className={styles.forumTopicName}>
                            <img width="20px" src="/svg/post-svg.svg" alt="post"/>
                                <Link href={"/forum/tehnika/" + id + '/' + doc.id}>
                                    <a><div  className={styles.link}>{doc.data.title}</div></a>
                                </Link>
                            </td>
                            <td className={styles.thDetails}>{doc.data.authorName}</td>
                            <td className={styles.thDetails}>{doc.data.replies}</td>
                            <td className={styles.thDatetimeSmall}>{doc.data.lastPosted}</td>
                        </tr>
                        })}
                       
                </tbody>
            </table>
            
        </div>
        <div className={styles.createAPostDiv}><Link href="/forum/create-post"><a><span className={styles.createPostSpan}>+ Create a post</span></a></Link></div>
    </div>
  )
}


export default ForumCategory