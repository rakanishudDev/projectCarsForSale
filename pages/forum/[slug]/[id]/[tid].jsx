import React from 'react'
import styles from '../../../../styles/Forum.module.css'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import { getForumTopic, commentPost } from '../../../../functions/forumFunctions'
import {useRouter} from 'next/router'
import Loading from '../../../../components/comps/Loading'
import { correctDateTimeFormat, makePath } from '../../../../functions/listingFunction'

const Topic = () => {

  const [topic, setTopic] = useState(null)
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const router = useRouter()
  const {slug, tid, id } = router.query
  const path = makePath(slug, id)
  console.log('render')
  const onComment = async () => {
    const {ok, reply, replyId} = await commentPost(comment, tid, id)
    if (ok) {
      console.log(replies)
      console.log(reply)
      setReplies(prevState => {
        return [{data: reply, id: replyId}, ...prevState ]
      })
      setComment('')
    } else {

    }
  }
  const onDataMudate = (e) => {
    setComment(e.target.value)
  }
  useEffect(() => {
    setLoading(true)
    const gettingTopicData = async () => {
      
      const {topicData, repliesData} = await getForumTopic(tid, id)
      console.log(topicData, repliesData)
      topicData[0].data.date = correctDateTimeFormat(topicData[0].data.date, true)
      repliesData.map(reply => {
        reply.data.date = correctDateTimeFormat(reply.data.date, true)
      })
      setTopic(topicData[0])
      setReplies(repliesData)
      setLoading(false)
    }
    if (tid) {
      gettingTopicData()
    }
    
    
  }, [tid])
  if (loading) {
    return <div className={styles.pageContainer}>
            <table style={{height: '400px'}} cellPadding="8" cellSpacing="0" className={styles.table}>
              <tbody className={styles.tbody}>
                <tr>
                  <td>
                    <div className="loadingContainer"><br /><br /><br /><Loading /></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  }
  return (
    <div className={styles.pageContainer}>
        <div>
            <table cellPadding="8" cellSpacing="0" className={styles.table}>
                <tbody className={styles.tbody}>
                    <tr>
                        <th className={styles.thAuthor}>Author</th>
                        <th colSpan="2">Topic</th>
                    </tr>
                    <tr>
                        <td className={styles.topicsCategory} colSpan="3">
                         {path + ' » ' + topic.data.title}
                        </td>
                       
                    </tr>

                      <tr className={styles.tableRowTopic}>
                        {topic && <>
                          <td valign="top" className={styles.tdAuthor}>
                            <div className={styles.authorDiv}>{topic.data.authorName}</div>
                          </td>
                          <td valign="top" className={styles.topicAuthorContent}>
                                <div  className={styles.topic}>{topic.data.post}</div>
                                <div><i>{topic.data.date}</i></div>
                          </td>
                          <td className={styles.thDatetime}>{topic.data.date}</td>
                          </>}
                      </tr>
                    
                    <tr>
                        <td className={styles.topicsCategory} colSpan="3">
                          V
                        </td>

                    </tr>
                    <tr>
                        
                        <td className={styles.commentInputTd} colSpan="3">
                        <div className={styles.commentInputDiv}>
                          <textarea value={comment} onChange={(e) => onDataMudate(e)} className={styles.commentInput}></textarea>
                          
                        </div>
                        <button onClick={onComment}>Comment</button>
                        </td>
                      

                    </tr>
                    {replies.map(reply => {
                        return <>
                        <tr key={reply.id} className={styles.tableRowTopicComment}>
                          <td valign="top" className={styles.commentAuthor}>
                            <div className={styles.authorDiv}>{reply.data.replyAuthor}</div>
                          </td>
                          <td className={styles.topicCommentContent} colSpan="2">
                              <div  className={styles.comment}>{reply.data.reply}</div>
                              <div className={styles.commentDate}><i>{reply.data.date}</i></div>
                          </td>
                        </tr>
                        <tr>
                          <td className={styles.commentBottomLine} colSpan="3">

                          </td>
                        </tr>
                        </>
                      })}
                     
                
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Topic