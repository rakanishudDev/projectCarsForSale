import {collection, docs, doc, getDoc, getDocs, serverTimestamp, addDoc, setDoc, updateDoc, updateDocs, query, startAt, where, orderBy, startAfter, limit} from 'firebase/firestore'
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
    let lastVisible = null
    let firstVisible = null
    try {
        const q = query(forumRef, orderBy('date', 'desc'), limit(15))
        const forumSnap = await getDocs(q)
        lastVisible = forumSnap.docs[forumSnap.docs.length - 1]
        firstVisible = forumSnap.docs[0]
        forumSnap.forEach(doc => {
            forumData.push({id: doc.id, data: doc.data()})
            return
        })
    } catch(err) {
        console.log(err)
    }
    return {forumData, lastVisible, firstVisible}
}

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

export const getNextForumData = async (id, lastFetchedListing) => {
    const forumRef = collection(db, 'forums', id, 'forum')
    let forumData = []
    let lastVisible = null
    let firstVisible = null
    try {
        const q = query(forumRef, orderBy('date', 'desc'), startAfter(lastFetchedListing), limit(15))
        const forumSnap = await getDocs(q)
        lastVisible = forumSnap.docs[forumSnap.docs.length - 1]
        firstVisible = forumSnap.docs[0]
        forumSnap.forEach(doc => {
            forumData.push({id: doc.id, data: doc.data()})
            return
        })
    } catch(err) {
        console.log(err)
    }
    return {forumData, lastVisible, firstVisible}
}

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

export const getPreviousForumData = async (id, lastFetchedListing) => {
    const forumRef = collection(db, 'forums', id, 'forum')
    let forumData = []
    let lastVisible = null
    let firstVisible = null
    try {
        const q = query(forumRef, orderBy('date', 'desc'), startAt(lastFetchedListing), limit(15))
        const forumSnap = await getDocs(q)
        lastVisible = forumSnap.docs[forumSnap.docs.length - 1]
        firstVisible = forumSnap.docs[0]
        forumSnap.forEach(doc => {
            forumData.push({id: doc.id, data: doc.data()})
            return
        })
    } catch(err) {
        console.log(err)
    }
    return {forumData, lastVisible, firstVisible}
}

//_\\//_\\/_\/_\/_\/_\/_\/_\/_\/=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//

export const getForumTopic = async (tid, id) => {
    const auth = getAuth()
    const topicRef = doc(db, 'forums', id, 'forum', tid)
    const repliesRef = collection(db, 'forums', id, 'forum', tid, 'replies')
    let topicData = []
    let repliesData = []
    try {
        const topicSnap = await getDoc(topicRef)
        if (topicSnap.exists()) {
            topicData.push({id: topicSnap.id, data: topicSnap.data()})
        }
        const q = query(repliesRef, orderBy('date', 'desc'))
        const repliesSnap = await getDocs(q)
        repliesSnap.forEach(doc => {
            repliesData.push({id: doc.id, data: doc.data()})
            return
        })
            
        

    } catch (err) {
        console.log(err)
    }
    let isOwner = false
    if (topicData[0].data.userRef === auth.currentUser.uid) {
        isOwner = true
    }
    return {topicData, repliesData, isOwner}
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
            userRef: auth.currentUser.uid,
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
        toast.info('Your post is now up')
        return {ok : true}
    } catch (err) {
        console.log(err)
        toast.error('Could not upload your post, something went wrong')
        return {ok : false}
    }
}

//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-// comment post

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
    toast.info('Your reply is now up')
    return {ok: true, replyId: replyId, reply: {
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

//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=// edit post

export const editTopic = async (formData, id, tid, currentTopic) => {
    let ok = false
   try {
        ok = true
        const docRef = doc(db, 'forums', id, 'forum' , tid)
        currentTopic.title = formData.title
        currentTopic.category = formData.category
        currentTopic.post = formData.content
        console.log(currentTopic)
        await updateDoc(docRef, currentTopic).catch(err =>{
            ok = false
            console.log(err)
        })
        
    } catch (err) {
        console.log(err)
        ok = false
    }
    return ok
}