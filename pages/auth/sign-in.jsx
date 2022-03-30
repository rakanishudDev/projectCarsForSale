import {useState} from 'react'
import Link from 'next/link'
import styles from '../../styles/SignIn.module.css'
import Oauth from '../../components/elements/Oauth';
import { withPublic } from '../../hooks/routes';
import { signInUser } from '../../functions/authFunctions';
import { useRouter } from 'next/router'
import {toast} from 'react-toastify'



const signIn = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formData
    const onChange = (e) => {
        setFormData(prevState => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            }
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const {error, user} = await signInUser(formData)
        console.log(error, user)
        if (error) {
            toast.error('ERRRORR')
            return
        }
        if (user) {
            toast.success('yayy')
            router.push('/')
            return
        }
        
    }
  return (
    <div className={styles.pageContainer}>
      <div>
        <header>
            <h1>Sign in</h1>
        </header>
        <form onSubmit={onSubmit} className={styles.formContainer}>
            
            <input type="email" id="email" className={styles.formInput} placeholder="Email" value={email} onChange={onChange}/>
            <input type="password" id="password" className={styles.formInput} placeholder="Password" value={password} onChange={onChange}/>
                
            <button className={styles.formButton} type="submit"><p className={styles.formButtonText}>Sign In</p> <img src="/svg/keyboardArrowRightIcon.svg" alt="arrow" /></button>
        
        </form>

        <div className="oauth-container">
            <Oauth />
        </div>
        <div className="signUpLinkDiv">
            <Link href="/auth/sign-up">
                <a className="link">Sign Up Instead</a>
            </Link>
            
        </div>
        <div>
        <br />
        <Link href="/forgot-password"><a>Forgot Your Passwword?</a></Link>
        </div>
      </div>
  </div>
  )
}

export default withPublic(signIn)