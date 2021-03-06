import React from 'react'
import styles from '../../styles/Forum.module.css'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import { getForumsData } from '../../functions/forumFunctions'
import Loading from '../../components/comps/Loading'
import { correctDateTimeFormat } from '../../functions/listingFunction'

const Forum = () => {
    const [forumsData, setForumsData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        const gettingForumsData = async () => {
            const data = await getForumsData()
            console.log(data)
            let forumsObj = {}
            data.map(doc => {
                console.log(doc)
                forumsObj[doc.data.forumName] = doc.data
                forumsObj[doc.data.forumName].id = doc.id
                forumsObj[doc.data.forumName].lastPosted = correctDateTimeFormat(doc.data.lastPosted)

                return
            })
            setForumsData(forumsObj)
            
            console.log(forumsObj)
            setLoading(false)
        }
        gettingForumsData()
        
        
    }, [])
    if (!forumsData) {
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
                        <th className={styles.th}>Forum</th>
                        <th className={styles.thDetails}>Topics</th>
                        <th className={styles.thDetailsLast}><span>Last posted</span></th>
                    </tr>
                    <tr>
                        <td className={styles.topicsCategory} colSpan="4">Tehnika</td>
                       
                    </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/tehnika/remont-hooldus">
                                    <a><div  className={styles.link}>Remont ja hooldus</div></a>
                                </Link></td>
                            <td className={styles.thDetails}>{forumsData['remont-hooldus'].topics}</td>
                            <td className={styles.thDetails}>{forumsData['remont-hooldus'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/tehnika/tehno??levaatus">
                                    <a><div  className={styles.link}>Tehno??levaatus</div></a>
                                </Link>
                            </td>
                            <td className={styles.thDetails}>{forumsData['tehno??levaatus'].topics}</td>
                            <td className={styles.thDetails}>{forumsData['tehno??levaatus'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/tehnika/varuosad">
                                    <a><div  className={styles.link}>Varuosad</div></a>
                                </Link>
                            </td>
                            <td className={styles.thDetails}>{forumsData['varuosad'].topics}</td>
                            <td className={styles.thDetails}>{forumsData['varuosad'].lastPosted}</td>
                        </tr>
                    <tr>
                        <td className={styles.topicsCategory} colSpan="4">S??idukite modifitseerimine ja tuunimine</td>
                       
                    </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/tuunimine/audio">
                                    <a><div  className={styles.link}>Audio</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['audio'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['audio'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/tuunimine/auto-v??limuse-muutmine">
                                    <a><div  className={styles.link}>Auto v??limuse muutmine</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['auto-v??limuse-muutmine'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['auto-v??limuse-muutmine'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/tuunimine/mootori-tuunimine">
                                    <a><div  className={styles.link}>Mootori tuunimine</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['mootori-tuunimine'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['mootori-tuunimine'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/tuunimine/veljed-rehvid">
                                    <a><div  className={styles.link}>Veljed ja rehvid</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['veljed-rehvid'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['veljed-rehvid'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/tuunimine/muu">
                                    <a><div  className={styles.link}>Muud vidinad</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['muu'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['muu'].lastPosted}</td>
                        </tr>
                    <tr>
                        <td className={styles.topicsCategory} colSpan="4">Mototehnika</td>
                       
                    </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/mototehnika/ATV">
                                    <a><div  className={styles.link}>ATV&lsquo;d</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['ATV'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['ATV'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/mototehnika/bike">
                                    <a><div  className={styles.link}>Bike&lsquo;id</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['bike'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['bike'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/mototehnika/chopperid">
                                    <a><div  className={styles.link}>Chopperid</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['chopperid'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['chopperid'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/mototehnika/mootorrattad">
                                    <a><div  className={styles.link}>Mootorrattad</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['mootorrattad'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['mootorrattad'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/mototehnika/mootorsaanid">
                                    <a><div  className={styles.link}>Mootorsaanid</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['mootorsaanid'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['mootorsaanid'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/mototehnika/rollerid">
                                    <a><div  className={styles.link}>Rollerid</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['rollerid'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['rollerid'].lastPosted}</td>
                        </tr>
                    <tr>
                        <td className={styles.topicsCategory} colSpan="4">Teised s??idukiliigid</td>
                       
                    </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/teised-s??idukid/bussid-kaubikud">
                                    <a><div  className={styles.link}>Bussid, v??ikebussid ja kaubikud</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['bussid-kaubikud'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['bussid-kaubikud'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/teised-s??idukid/haagissuvilad">
                                    <a><div  className={styles.link}>Haagissuvilad</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['haagissuvilad'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['haagissuvilad'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/teised-s??idukid/maasturid">
                                    <a><div  className={styles.link}>Maasturid</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['maasturid'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['maasturid'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/teised-s??idukid/vees??idukid">
                                    <a><div  className={styles.link}>Vees??idukid</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['vees??idukid'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['vees??idukid'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/teised-s??idukid/veoautod-rasketehnika">
                                    <a><div  className={styles.link}>Veoautod ja rasketehnika</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['veoautod-rasketehnika'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['veoautod-rasketehnika'].lastPosted}</td>
                        </tr>
                    <tr>
                        <td className={styles.topicsCategory} colSpan="4">Muud foorumid</td>
                       
                    </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/muud-foorumid/autondus">
                                    <a><div  className={styles.link}>Autondus</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['autondus'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['autondus'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/muud-foorumid/kindlustus">
                                    <a><div  className={styles.link}>Kindlustus</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['kindlustus'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['kindlustus'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/muud-foorumid/liiklus">
                                    <a><div  className={styles.link}>Liiklus</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['liiklus'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['liiklus'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/muud-foorumid/??ppes??it-autokoolid">
                                    <a><div  className={styles.link}>??ppes??it ja autokoolid</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['??ppes??it-autokoolid'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['??ppes??it-autokoolid'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/muud-foorumid/ostuabi">
                                    <a><div  className={styles.link}>Ostuabi</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['ostuabi'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['ostuabi'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/muud-foorumid/finantseerimine">
                                    <a><div  className={styles.link}>S??iduki ostu finantseerimine</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['finantseerimine'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['finantseerimine'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/muud-foorumid/vaba-teema">
                                    <a><div  className={styles.link}>Vaba teema</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['vaba-teema'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['vaba-teema'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/muud-foorumid/v??istlustanner">
                                    <a><div  className={styles.link}>V??istlustanner ehk autode v??rdlus</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['v??istlustanner'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['v??istlustanner'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/muud-foorumid/??ritused">
                                    <a><div  className={styles.link}>??ritused</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['??ritused'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['??ritused'].lastPosted}</td>
                        </tr>
                    <tr>
                        <td className={styles.topicsCategory} colSpan="4">Auto sport</td>
                       
                    </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/auto-sport/eesti-autosport">
                                    <a><div  className={styles.link}>Eesti autosport</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['eesti-autosport'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['eesti-autosport'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/auto-sport/vormel1">
                                    <a><div  className={styles.link}>Vormel 1</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['vormel1'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['vormel1'].lastPosted}</td>
                        </tr>
                        <tr className={styles.tableRow}>
                            <td className={styles.forumName}>
                                <Link href="/forum/auto-sport/WRC">
                                    <a><div  className={styles.link}>WRC</div></a>
                                </Link></td>
                                <td className={styles.thDetails}>{forumsData['WRC'].topics}</td>
                                <td className={styles.thDetails}>{forumsData['WRC'].lastPosted}</td>
                        </tr>
                        
                </tbody>
            </table>
        </div>
        <div className={styles.createAPostDiv}><Link href="/forum/create-post"><a><span className={styles.createPostSpan}>+ Create a post</span></a></Link></div>
    </div>
  )
}

export default Forum