import {getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth'
import {doc, setDoc, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'





export const signUpUser = async (formData) => {

    const {email, name, location, username, password, passwordConfirm} = formData
    try {
        const auth = getAuth();

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user

        updateProfile(auth.currentUser, {
            displayName: name,
            username: username,
            location: location
        });

        const formDataCopy = {...formData};
        delete formDataCopy.password;
        delete formDataCopy.passwordConfirm;
        formDataCopy.timestamp = serverTimestamp();
        formDataCopy.uid = user.uid;

        //save user to db | DB---- users collection, user id from userCredential.user
        //out form values from formDataCopy

        await setDoc(doc(db, 'users', user.uid), formDataCopy);
        return {
            ok: true
        }


    } catch (err) {
        console.table(err.message)
        toast.error(err.code)
        return {
            ok: false
        }
    }


}
export const signInUser = async (formData) => {
 
    const {email, password} = formData
    try {
        const auth = getAuth();
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        if (userCredentials.user) {
            return {error: false, user: true}
        } else {
            toast.error('Bad user credentials!')
            return {error: true, user: false}
        }
        
        
    } catch (err) {
        
        toast.error('Bad user credentials!');
        console.log(err);
        return {error: true, user: false}
    }
}