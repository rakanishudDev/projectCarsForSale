import React from 'react'
import styles from '../../../../styles/Forum.module.css'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import { getForumData, getNextForumData, getPreviousForumData } from '../../../../functions/forumFunctions'
import {useRouter} from 'next/router'
import { correctDateTimeFormat, makePath } from '../../../../functions/listingFunction'





const ForumCategory = () => {
    const router = useRouter();
    const {slug, id} = router.query
    const path = makePath(slug, id)
    const [lastDoc, setLastDoc] = useState(null)
    const [previousPage, setPreviousPage] = useState({})
    const [page, setPage] = useState(1)
    const [forumData, setForumData] = useState([])

    //-//-//-//-//-//-//-//-//-//-//-//-//-//

    const fetchPrevious = async () => {

            const data = await getPreviousForumData(id, previousPage[page-1])
            setLastDoc(data.lastVisible)

            data.forumData.map(doc => {
                doc.data.date = correctDateTimeFormat(doc.data.date, true)
                doc.data.lastPosted = correctDateTimeFormat(doc.data.lastPosted, true)
                return
            })
            setForumData(data.forumData)
            setPage(page - 1)
    }

    //-//-//-//-//-//-//-//-//-//-//-//-//-//

    const fetchMore = async () => {
        const data = await getNextForumData(id, lastDoc)
        setLastDoc(data.lastVisible)
        data.forumData.map(doc => {
                doc.data.date = correctDateTimeFormat(doc.data.date, true)
                doc.data.lastPosted = correctDateTimeFormat(doc.data.lastPosted, true)
                return
        })
        if (!data.forumData.length) {
            return
        }
        setForumData(data.forumData)
        setPreviousPage(prevState => {
            return {...prevState, [page + 1]: data.firstVisible}
        })
        setPage(page + 1)
        console.log(page)
    }

    //-//-//-//-//-//-//-//-//-//-//-//-//-//

    useEffect(() => {
        const gettingForumData = async () => {
            const data = await getForumData(id)
            setLastDoc(data.lastVisible)
            setPreviousPage(prevState => {
                return {...prevState, [page]: data.firstVisible}
            })
            data.forumData.map(doc => {
                 doc.data.date = correctDateTimeFormat(doc.data.date, true)
                 doc.data.lastPosted = correctDateTimeFormat(doc.data.lastPosted, true)
                 return
            })
        setForumData(data.forumData)
        
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
                        <td className={styles.topicsCategory} colSpan="4">
                            <Link href="/forum"><a className={styles.pathLink}>{path.a}</a></Link> » <Link href={`/forum/${slug}/${id}`}><a className={styles.pathLink}>{path.b}</a></Link>
                        </td>
                       
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
            <div className={styles.underTableDiv}>
                <div className={styles.createAPostDiv}>
                    <Link href="/forum/create-post">
                        <a><span className={styles.createPostSpan}>+ Create a post</span></a>
                    </Link>
                </div>
                <div className={styles.paginationButtons}>
                    {page !== 1 && <p className={styles.nextPage}onClick={() => fetchPrevious()}>Previous</p>}
                    {forumData.length > 14 && <p className={styles.nextPage}onClick={() => fetchMore()}>Next</p>}
                </div>
            </div>
        </div>
    </div>
  )
}


export default ForumCategory