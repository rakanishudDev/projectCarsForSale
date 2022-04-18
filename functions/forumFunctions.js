import {collection, docs, doc, getDoc, getDocs, serverTimestamp, addDoc, setDoc, updateDoc, updateDocs, query} from 'firebase/firestore'
import { db } from '../firebase.config';
import {getAuth} from 'firebase/auth';
import {toast} from 'react-toastify'


//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

export const getForumsData = async () => {
    const forumsRef = collection(db, 'forums')
    let forumsData = []
    try {
        const forumsSnap = await getDocs(forumsRef)
        if (forumsSnap) {
            console.log(forumsSnap)
            forumsSnap.forEach(doc => {
                forumsData.push({id: doc.id, data: doc.data()})
                return
            })
        }
    } catch (err) {
        console.error(err)
    }
    return forumsData
}


//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

export const getForumData = async (id) => {
    const forumRef = collection(db, 'forums', id, 'forum')
    let forumData = []
    try {
        const forumSnap = await getDocs(forumRef)
        forumSnap.forEach(doc => {
            forumData.push({id: doc.id, data: doc.data()})
            return
        })
    } catch(err) {
        console.log(err)
    }
    console.log(forumData)
    return forumData
}
export const getForumTopics = async (id) => {
    
}

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

export const getForumTopic = async (tid, id) => {
    const topicRef = doc(db, 'forums', id, 'forum', tid)
    const repliesRef = collection(db, 'forums', id, 'forum', tid, 'replies')
    let topicData = []
    let repliesData = []
    try {
        const topicSnap = await getDoc(topicRef)
        console.log(topicSnap)
        if (topicSnap.exists()) {
            console.log(topicSnap)
            topicData.push({id: topicSnap.id, data: topicSnap.data()})
        }
        const repliesSnap = await getDocs(repliesRef)
        repliesSnap.forEach(doc => {
            repliesData.push({id: doc.id, data: doc.data()})
            return
        })
            
        

    } catch (err) {
        console.log(err)
    }
    return {topicData, repliesData}
}


//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

export const createPost = async (formData) => {
    const auth = getAuth()
    const postRef = collection(db, 'forums', formData.category, 'forum')
    console.log(formData)
    console.log(serverTimestamp())
    try {
        const formDataCopy = {
            authorName: auth.currentUser.displayName,
            date: serverTimestamp(),
            lastPosted: serverTimestamp(),
            post: formData.content,
            title: formData.title,
            replies: 0,
        }
        await addDoc(postRef, formDataCopy).then(async () => {
            const docInfo = await getDoc(doc(db, 'forums', formData.category))
            await updateDoc(doc(db, 'forums', formData.category), {
                lastPosted: serverTimestamp(),
                topics: docInfo.data().topics + 1

            })
        })
        toast.success('Your post is now up')
        return {ok : true}
    } catch (err) {
        console.log(err)
        toast.error('Could not upload your post, something went wrong')
        return {ok : false}
    }
}

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

export const commentPost = async (comment, tid, id) => {
    const auth = getAuth()
    const replyId = id + (Date.now() * Math.random())
    try {
    await setDoc(doc(db, `forums/${id}/forum/${tid}/replies`, replyId), {
        date: serverTimestamp(),
        reply: comment,
        replyAuthor: auth.currentUser.displayName
    }).then(async () => {
        const docInfo = await getDoc(doc(db, 'forums', id, 'forum', tid))
        await updateDoc(doc(db, 'forums', id, 'forum', tid), {
            lastPosted: serverTimestamp(),
            replies: docInfo.data().replies + 1

        })
    })
    toast.success('Your reply is now up')
    return {ok: true, id: replyId, reply: {
        date: Date.now(),
        reply: comment,
        replyAuthor: auth.currentUser.displayName
    }}
    } catch (err) {
        console.log(err)
        toast.error('Could not upload your reply, something went wrong')
        return {ok: false}
    }
}

