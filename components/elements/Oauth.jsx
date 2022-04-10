import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';
import {useRouter} from 'next/router'
import {googleIcon} from '../../public/svg/googleIcon.svg';

function Oauth() {
  const router = useRouter()

  const googleAuth = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log(user)
      //check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          favorites: [],
          uid: user.auth.currentUser.uid,
          timestamp: serverTimestamp()
        })
      }
      router.push('/')

    } catch(err) {
      console.log(err)
      toast.error('Could not authorize with Google')
    }
  }
  return (<div className="oauth">
        <button onClick={googleAuth} className="formButtonOauth">
          <img className="socialIcon" src="/svg/googleIcon.svg" alt="google" />
          <p className="formButtonText">Login With Google</p>
        </button>
  </div>)
}

export default Oauth;