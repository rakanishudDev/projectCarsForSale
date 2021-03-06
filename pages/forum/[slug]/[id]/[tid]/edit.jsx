import React from 'react'
import styles from '../../../../../styles/Forum.module.css'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import { editTopic, getForumTopic } from '../../../../../functions/forumFunctions'
import {useRouter} from 'next/router'

const Edit = () => {
    const router = useRouter()
    const {slug, id, tid} = router.query
    const [currentTopic, setCurrentTopic] = useState(null)
    const [formData, setFormData] = useState({
        category: "",
        title: "",
        content: ""

    })
    const onDataMudate = (e) => {
        setFormData(prevState => {
            return {...prevState, [e.target.id]: e.target.value}
        })
    } 
    const onSubmit = async (e) => {
        e.preventDefault()
        const ok = await editTopic(formData, id, tid, currentTopic)
        if (ok) {
            console.log(ok)
            router.push(`/forum/${slug}/${id}/${tid}`)
        }
    }
    useEffect(() => {
        const fetchingForumTopic = async () => {
            console.log(tid, id)
            const {topicData, isOwner} = await getForumTopic(tid, id)
            console.log(topicData)
            if (isOwner) {
                setCurrentTopic(topicData[0].data)
                setFormData({
                    category: id,
                    title: topicData[0].data.title,
                    content: topicData[0].data.post
                })
            }
            return
        }
        if (tid, id) {
            fetchingForumTopic()
        }
        
    }, [tid, id])
  return (
      <div className={styles.pageContainer}>
    <table cellPadding="8" cellSpacing="0" className={styles.table}>
                <tbody className={styles.tbody}>
                    <tr>
                        <th colSpan="8" className={styles.th}>Edit</th>
                        
                    </tr>
                    <tr>
                        <td style={{height: "31px"}} className={styles.topicsCategory} colSpan="4"></td>
                       
                    </tr>
                    <tr>
                    <td className={styles.createPostContainer}>
                        <form onSubmit={onSubmit} className={styles.createPostForm}>
                            <div>
                            <label className={styles.formLabel}>Category</label>
                            <select value={formData.category} id="category" onChange={(e) => onDataMudate(e)} className={styles.formSelect}>
                                <option value="placeholder"></option>
                                <optgroup label="Tehnika">
                                    <option value="remont-hooldus">remont ja hooldus</option>
                                    <option value="tehno??levaatus">Tehno??levaatus</option>
                                    <option value="varuosad">Varuosad</option>
                                </optgroup>
                                <optgroup label="S??idukite modifitseerimine">
                                    <option value="audio">Audio</option>
                                    <option value="auto-v??limuse-muutmine">Auto v??limuse muutmine</option>
                                    <option value="mootori-tuunimine">Mootori tuunimine</option>
                                    <option value="veljed-rehvid">Veljed ja rehvid</option>
                                    <option value="muu">Muud vidinad</option>
                                </optgroup>
                                <optgroup label="Mototehnika">
                                    <option value="ATV">ATV&lsquo;d</option>
                                    <option value="bike">Bike&lsquo;id</option>
                                    <option value="chopperid">Chopperid</option>
                                    <option value="mootorrattad">Mootorrattad</option>
                                    <option value="mootorsaanid">Mootorsaanid</option>
                                    <option value="rollerid">Rollerid</option>
                                </optgroup>
                                <optgroup label="Tesied s??idukiliigid">
                                    <option value="bussid-kaubikud">Bussid, v??ikebussid ja kaubikud</option>
                                    <option value="haagissuvilad">Haagissuvilad</option>
                                    <option value="maasturid">Maasturid</option>
                                    <option value="vees??idukid">Vees??idukid</option>
                                    <option value="veoautod-rasketehnika">Veoautod ja rasketehnika</option>
                                </optgroup>
                                <optgroup label="Muud foorumid">
                                    <option value="autondus">Autondus</option>
                                    <option value="kindlustus">Kindlustus</option>
                                    <option value="liiklus">Liiklus</option>
                                    <option value="??ppes??it-autokoolid">??ppes??it ja autokoolid</option>
                                    <option value="ostuabi">Ostuabi</option>
                                    <option value="finantseerimine">S??iduki ostu finantseerimine</option>
                                    <option value="vaba-teema">Vaba teema</option>
                                    <option value="v??istlustanner">V??istlustanner ehk autode v??rdlus</option>
                                    <option value="??ritused">??ritused</option>
                                </optgroup>
                                <optgroup label="Autosport">
                                    <option value="eesti-autosport">Eesti autosport</option>
                                    <option value="vormel1">Vormel 1</option> 
                                    <option value="WRC">WRC</option>
                                </optgroup>

                            </select>
                            </div>
                            <div>
                                <label className={styles.formLabel}>Title</label>
                                <input value={formData.title} id="title" onChange={(e) => onDataMudate(e)} className={styles.formTitle} type="text" />
                            </div>
                            <div>
                                <label className={styles.formLabel}>Content</label>
                                <textarea value={formData.content} id="content" onChange={(e) => onDataMudate(e)} className={styles.formTextarea}>

                            </textarea>
                            </div>
                            <button className={styles.formSubmit}>Submit</button>
                        </form>
                    </td>
                    </tr> 
                    
                </tbody>
            </table>
            </div>
  )
}

export default Edit