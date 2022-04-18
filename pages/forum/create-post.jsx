import React from 'react'
import styles from '../../styles/Forum.module.css'
import Link from 'next/link'
import {useState} from 'react'
import { createPost } from '../../functions/forumFunctions'
import {useRouter} from 'next/router'

const CreatePost = () => {
    const router = useRouter()
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
        const {ok} = await createPost(formData)
        if (ok) {
            router.push('/forum')
        }
    }
  return (
      <div className={styles.pageContainer}>
    <table cellPadding="8" cellSpacing="0" className={styles.table}>
                <tbody className={styles.tbody}>
                    <tr>
                        <th colspan="8" className={styles.th}>Create a Post</th>
                        
                    </tr>
                    <tr>
                        <td style={{height: "31px"}} className={styles.topicsCategory} colSpan="4"></td>
                       
                    </tr>
                    <tr>
                    <td className={styles.createPostContainer}>
                        <form onSubmit={onSubmit} className={styles.createPostForm}>
                            <div>
                            <label className={styles.formLabel}>Category</label>
                            <select id="category" onChange={(e) => onDataMudate(e)} className={styles.formSelect}>
                                <option value="placeholder"></option>
                                <optgroup label="Tehnika">
                                    <option value="remont-hooldus">remont ja hooldus</option>
                                    <option value="tehnoülevaatus">Tehnoülevaatus</option>
                                    <option value="varuosad">Varuosad</option>
                                </optgroup>
                                <optgroup label="Sõidukite modifitseerimine">
                                    <option value="audio">Audio</option>
                                    <option value="auto-välimuse-muutmine">Auto välimuse muutmine</option>
                                    <option value="mootori-tuunimine">Mootori tuunimine</option>
                                    <option value="veljed-rehvid">Veljed ja rehvid</option>
                                    <option value="muu">Muud vidinad</option>
                                </optgroup>
                                <optgroup label="Mototehnika">
                                    <option value="ATV">ATV'd</option>
                                    <option value="bike">Bike'id</option>
                                    <option value="chopperid">Chopperid</option>
                                    <option value="mootorrattad">Mootorrattad</option>
                                    <option value="mootorsaanid">Mootorsaanid</option>
                                    <option value="rollerid">Rollerid</option>
                                </optgroup>
                                <optgroup label="Tesied sõidukiliigid">
                                    <option value="bussid-kaubikud">Bussid, väikebussid ja kaubikud</option>
                                    <option value="haagissuvilad">Haagissuvilad</option>
                                    <option value="maasturid">Maasturid</option>
                                    <option value="veesõidukid">Veesõidukid</option>
                                    <option value="veoautod-rasketehnika">Veoautod ja rasketehnika</option>
                                </optgroup>
                                <optgroup label="Muud foorumid">
                                    <option value="autondus">Autondus</option>
                                    <option value="kindlustus">Kindlustus</option>
                                    <option value="liiklus">Liiklus</option>
                                    <option value="õppesõit-autokoolid">Õppesõit ja autokoolid</option>
                                    <option value="ostuabi">Ostuabi</option>
                                    <option value="finantseerimine">Sõiduki ostu finantseerimine</option>
                                    <option value="vaba-teema">Vaba teema</option>
                                    <option value="võistlustanner">Võistlustanner ehk autode võrdlus</option>
                                    <option value="üritused">Üritused</option>
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
                            <input id="title" onChange={(e) => onDataMudate(e)} className={styles.formTitle} type="text" />
                            </div>
                            <div>
                            <label className={styles.formLabel}>Content</label>
                            <textarea id="content" onChange={(e) => onDataMudate(e)} className={styles.formTextarea}>

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

export default CreatePost